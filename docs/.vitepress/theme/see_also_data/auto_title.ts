import { zip } from 'es-toolkit';
import assert from 'node:assert';
import { duration_fmt, removePrefix } from '../../util';
import { execFile } from '../../util_node';
import type { Link, RelativePath } from '../see_also.data';

export const AUTO_TITLE = '⟨AUTO_TITLE⟩';

/** Resolve `AUTO_TITLE` in place. */
export async function resolveAutoTitle(
  linksIndex: Record<RelativePath, Link[]>,
): Promise<void> {
  const targets = Object.values(linksIndex)
    .flat()
    .filter(({ title }) => title === AUTO_TITLE);

  await tryResolveViaGitHub(targets);

  // Last resort (without network access)
  for (const link of targets) {
    if (link.title !== AUTO_TITLE) {
      continue;
    }

    const github = tryParseUrl(link.url);
    if (github !== null) {
      const repo = removePrefix(github.repo, 'typst/');
      const typeHuman = github.type === 'pull' ? 'pull request' : github.type;
      link.title = `${repo}#${github.num} (${typeHuman})`;
      continue;
    }

    link.title = removePrefix(link.url, 'https://');
  }
}

interface RepoNum {
  repo: string;
  num: number;
}
interface IssueMeta extends RepoNum {
  type: 'issue';
}
interface PullMeta extends RepoNum {
  type: 'pull';
}
interface DiscussionMeta extends RepoNum {
  type: 'discussion';
}

/** Parse a GitHub URL. Returns `null` if failed */
function tryParseUrl(
  url: string,
): IssueMeta | PullMeta | DiscussionMeta | null {
  if (url.startsWith('https://github.com/')) {
    const match = removePrefix(url, 'https://github.com/').match(
      /^([^/]+\/[^/]+)\/(pull|issues|discussions)\/(\d+)\/?$/i,
    );
    if (match) {
      const [, repo, kind, numStr] = match;
      return {
        repo,
        num: Number(numStr),
        type: kind.replace(/s$/, '') as 'pull' | 'issue' | 'discussion',
      };
    }
  }
  return null;
}

function parseRepo(repo: string): {
  owner: string;
  name: string;
  repoSanitized: string;
} {
  const [owner, name] = repo.split('/', 2);
  const repoSanitized = repo.replaceAll(/[\/-]/g, '_');
  return { owner, name, repoSanitized };
}

/**
 * Grouped by `repo` and `num`, and flattened
 *
 * E.g., an array of `[IssueMeta[] of an issue in a repo]`.
 */
type GroupedFlat<T extends RepoNum> = T[][];

/**
 * Grouped by `repo` and `num`
 *
 * repo ⇒ num ⇒ `T[]` of this repo and num.
 */
type Grouped<T extends RepoNum> = Map<string, [number, T[]][]>;

function flattenGrouped<T extends RepoNum>(
  grouped: Grouped<T>,
): GroupedFlat<T> {
  return Array.from(grouped.values())
    .flat()
    .map(([_num, meta]) => meta);
}

/**
 * Group `meta_list` by `repo` and `num`.
 *
 * Duplicate items will be collected into a single entry.
 */
function groupByRepoNum<T extends RepoNum>(meta_list: T[]): Grouped<T> {
  const repos = new Set(meta_list.map((i) => i.repo));

  const grouped = new Map(
    Array.from(repos.values()).map((repo) => {
      const concerned = meta_list.filter((i) => repo === i.repo);
      const numUniq = Array.from(
        new Set(concerned.map(({ num }) => num)).values(),
      );
      return [
        repo,
        numUniq.map(
          (n) => [n, concerned.filter(({ num }) => n === num)] as [number, T[]],
        ),
      ];
    }),
  );
  return grouped;
}

type IssueState = { title: string } & (
  | {
      state: 'OPEN';
      stateReason: string | null;
      closed: false;
    }
  | {
      state: 'CLOSED';
      stateReason: 'COMPLETED' | string;
      closed: true;
    }
);

type PullState = { title: string } & (
  | {
      state: 'OPEN';
      merged: false;
      closed: false;
    }
  | ({ closed: true } & (
      | {
          state: 'MERGED';
          merged: true;
        }
      | {
          state: 'CLOSED';
          merged: false;
        }
    ))
);

/**
 * Query GitHub GraphQL API using GitHub CLI.
 * https://docs.github.com/en/graphql/reference/queries
 */
async function queryGitHub(
  query: string,
  vars: Record<string, string | number> = {},
): Promise<any> {
  const timeStart = Date.now();

  const { stdout } = await execFile('gh', [
    'api',
    'graphql',
    '--raw-field',
    `query=${query}`,
    ...Object.entries(vars).flatMap(([k, v]) => ['--field', `${k}=${v}`]),
  ]);

  console.log(
    `📩 Got ${stdout.length} characters from GitHub API successfully in`,
    `${duration_fmt(Date.now() - timeStart)}.`,
  );

  return JSON.parse(stdout).data;
}

/**
 * @returns query The GraphQL query.
 * @returns grouped
 */
function generateQuery(meta_list: (IssueMeta | PullMeta)[]): {
  query: string;
  grouped: GroupedFlat<IssueMeta | PullMeta>;
} {
  const grouped = groupByRepoNum(meta_list);

  const query = [
    'query {',
    ...Array.from(grouped.entries()).map(([repo, items]) => {
      const { owner, name, repoSanitized } = parseRepo(repo);
      return [
        `  ${repoSanitized}_issues: repository(owner: "${owner}", name: "${name}") {`,
        ...items.map(
          ([num, _meta]) =>
            `    item_${num}:  issueOrPullRequest(number: ${num}) {
                  __typename
                  ... on Issue { title state stateReason closed }
                  ... on PullRequest { title state merged closed }
                }`,
        ),
        '  }',
      ];
    }),
    '}',
  ]
    .flat()
    .join('\n');

  return { query, grouped: flattenGrouped(grouped) };
}

type SerializedMeta = string;

/** A map from serialized metadata to their states. */
const _GITHUB_STATES_CACHE = new Map<SerializedMeta, IssueState | PullState>();

function serialize(item: IssueMeta | PullMeta): SerializedMeta {
  return JSON.stringify([item.repo, item.num, item.type]);
}

/** Fetch states of issues and pull requests, and save to `_GITHUB_STATES_CACHE`. */
async function fetchStates(meta_list: (IssueMeta | PullMeta)[]): Promise<void> {
  const { query, grouped } = generateQuery(meta_list);

  const data = (await queryGitHub(query)) as Record<
    string,
    Record<
      number,
      | ({ __typename: 'Issue' } & IssueState)
      | ({ __typename: 'PullRequest' } & PullState)
    >
  >;

  // Use the first meta for each `RepoNum`.
  const metaFlat = grouped.map((meta) => serialize(meta[0]));

  const stateFlat: (IssueState | PullState)[] = Object.values(data)
    .map((items_of_a_repo) => Object.values(items_of_a_repo))
    .flat();

  assert.strictEqual(metaFlat.length, stateFlat.length);

  // This will be `<` if `meta_list` has duplicates.
  assert(metaFlat.length <= meta_list.length);

  for (const [meta, state] of zip(metaFlat, stateFlat)) {
    _GITHUB_STATES_CACHE.set(meta, state);
  }
}

/**
 * Try to populate titles via GitHub in place.
 *
 * Existing titles in targets will be overridden.
 */
async function tryResolveViaGitHub(targets: Link[]): Promise<void> {
  // 0. Filter out items that can be resolved

  const relevant = targets
    .map((link) => {
      const meta = tryParseUrl(link.url);
      if (meta === null || meta.type === 'discussion') {
        return null; // Ignored non-GitHub URLs and GitHub Discussions
      }
      return [link, meta] as const;
    })
    .filter((x) => x !== null) as [Link, IssueMeta | PullMeta][];

  // 1. Update cache

  const fetchPlan = relevant.flatMap(([_link, meta]) =>
    _GITHUB_STATES_CACHE.has(serialize(meta)) ? [] : meta,
  );

  try {
    await fetchStates(fetchPlan);
  } catch (e) {
    // @ts-ignore
    if (e.code === 'ENOENT') {
      console.warn(
        '[Warning] GitHub CLI is not available. Skip resolving titles via GitHub for `<SeeAlso>`.',
      );
      return;
    }
    throw e;
  }

  // 2. Use the cache to populate titles

  for (const [link, meta] of relevant) {
    const state = _GITHUB_STATES_CACHE.get(serialize(meta));
    assert(state !== undefined);

    const repoNum = `${removePrefix(meta.repo, 'typst/')}#${meta.num}`;

    switch (meta.type) {
      case 'issue': {
        const { title, state: status, stateReason } = state as IssueState;
        const isReasonNormal =
          stateReason === null ||
          (status === 'CLOSED' && stateReason === 'COMPLETED');
        const reasonHuman = isReasonNormal
          ? null
          : stateReason.toLowerCase().replaceAll('_', ' ');

        link.title = `${title} · ${repoNum} (${status.toLowerCase()} issue${reasonHuman !== null ? `, ${reasonHuman}` : ''})`;
        break;
      }
      case 'pull': {
        const { title, closed, merged } = state as PullState;
        const status = closed ? (merged ? 'merged' : 'rejected') : 'open';

        link.title = `${title} · ${repoNum} (${status} pull request)`;
        break;
      }
    }
  }
}
