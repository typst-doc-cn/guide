import type { ContentData } from 'vitepress';
import type { Link, RelativePath } from '../see_also.data';
import { AUTO_TITLE } from './auto_title';

type LinkInFrontmatter = string | { url: string; title?: string };

/** Parse `links` in page frontmatter. */
export function* parseFrontmatter(
  rawData: ContentData[],
): Generator<[RelativePath, Link[]]> {
  for (const { url, frontmatter } of rawData) {
    if (frontmatter.links) {
      const path = url as RelativePath;
      const links = (frontmatter.links as LinkInFrontmatter[]).map((l) =>
        typeof l === 'string'
          ? { url: l, title: AUTO_TITLE }
          : {
              url: l.url,
              title: l.title || AUTO_TITLE,
            },
      );

      yield [path, links];
    }
  }
}
