import { removePrefix } from '../../util';
import type { Link, RelativePath } from '../see_also.data';
import { AUTO_TITLE } from './auto_title';
import { FileCache } from './caching.ts';

const GAP_BASE: `https://${string}/` = 'https://typst-doc-cn.github.io/clreq/';

// Simplified types for the gap index

type GapIndex = {
  version: '2025-11-24';
  sections: Section[];
};
type Section = {
  title: Babel;
  level: number;
  id?: string;
  priority: GeneralPriority;
  links: (
    | ({ type: 'issue' | 'pull' } & RepoNum)
    | ({ type: 'workaround' } & WorkaroundMeta)
  )[];
};

type Priority = 'ok' | 'advanced' | 'basic' | 'broken' | 'tbd' | 'na';
type GeneralPriority = Priority | '(inherited)';

type Babel = { en: string; 'zh-Hans': string };

type WorkaroundMeta = {
  dest: string;
  note: string | null;
};
type RepoNum = {
  repo: string;
  num: string;
};

function formatPriority(priority: GeneralPriority): string {
  switch (priority) {
    case 'ok':
      return 'OK';
    case 'tbd':
      return 'To be done';
    case 'na':
      return 'Not applicable';
    case '(inherited)':
      return priority;
    default:
      return priority[0].toUpperCase() + priority.slice(1);
  }
}

function formatWorkaround({ dest, note }: WorkaroundMeta): string {
  // Adapted from https://github.com/typst-doc-cn/clreq/blob/2669b82d465927e560b9125e698c32e9d2c2a213/typ/util.typ#L84

  const humanDest = dest.startsWith('https://typst.app/universe/package/')
    ? `universe/${removePrefix(dest, 'https://typst.app/universe/package/')}`
    : removePrefix(removePrefix(dest, 'https://').split('.')[0], 'typst-');

  return note ? `${note} (${humanDest})` : humanDest;
}

let _GAP_INDEX_CACHE = new FileCache<GapIndex>(
  'gap_index.json',
  JSON.stringify,
  JSON.parse,
);

/** Fetch the index for clreq-gap for typst. */
export async function fetchGapIndex(): Promise<GapIndex> {
  if (_GAP_INDEX_CACHE.get() === null) {
    const gapIndex = await (await fetch(`${GAP_BASE}index.json`)).json();
    _GAP_INDEX_CACHE.set(gapIndex);
    _GAP_INDEX_CACHE.save();
  }
  return _GAP_INDEX_CACHE.get()!;
}

/** Parse the index for clreq-gap for typst. */
export function* parseGapIndex(
  gapIndex: GapIndex,
): Generator<[RelativePath, Link[]]> {
  /** The canonical site base used in the gap index. Might be different from the deployed base. */
  const siteBase: `https://${string}/` =
    'https://typst-doc-cn.github.io/guide/';

  for (const section of gapIndex.sections) {
    const relevant = section.links.filter(
      (l) => l.type === 'workaround' && l.dest.startsWith(siteBase),
    ) as ({ type: 'workaround' } & WorkaroundMeta)[];

    for (const workaround of relevant) {
      // Drop base and anchor hash
      const path: RelativePath = `/${removePrefix(workaround.dest, siteBase).replace(/#.+$/, '')}`;

      yield [
        path,
        [
          // Link to the section itself
          {
            title: `差距分析：${section.title['zh-Hans']}（级别：${formatPriority(section.priority)}）`,
            url: `${GAP_BASE}#${section.id}`,
          },

          // Links in the section
          ...section.links.flatMap((l) => {
            if (l.type === 'workaround') {
              return l.dest === workaround.dest
                ? [] // Skip the workaround itself
                : {
                    url: l.dest,
                    title: `相关解决方案：${formatWorkaround(l)}`,
                  };
            }
            return {
              url: `https://github.com/${l.repo}/${l.type === 'pull' ? 'pull' : 'issues'}/${l.num}`,
              title: AUTO_TITLE,
            };
          }),
        ],
      ];
    }
  }
}
