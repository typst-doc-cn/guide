/**
 * Generate data for `<SeeAlso>`.
 *
 * # Data sources
 *
 * - the index for clreq-gap for typst
 * - `links: (string | { url: string, title?: string })[]` in page frontmatter
 *
 * # Implementation details
 *
 * When modifying the page frontmatter, the loader may be called repeatedly. Therefore, network requests are cached.
 *
 * For maximal compatibility, features requires network or GitHub API are disabled granularly if not available.
 *
 * @module
 */

import { createContentLoader } from 'vitepress';
import { resolveAutoTitle } from './see_also_data/auto_title';
import { parseFrontmatter } from './see_also_data/frontmatter';
import { fetchGapIndex, parseGapIndex } from './see_also_data/gap_index';

export type Link = {
  url: string;
  title: string;
};

/** The route URL path relative to the site base, e.g., `/FAQ/cite-flying.html`. */
export type RelativePath = `/${string}`;

export interface Data {
  linksIndex: Record<RelativePath, Link[]>;
}

declare const data: Data;
export { data };

export default createContentLoader('FAQ/*.md', {
  async transform(rawData): Promise<Data> {
    const linksIndex: Record<RelativePath, Link[]> = {};

    // Build the links index from data sources
    for (const data of [
      parseGapIndex(await fetchGapIndex()),
      parseFrontmatter(rawData),
    ]) {
      for (const [path, links] of data) {
        if (!linksIndex[path]) {
          linksIndex[path] = [];
        }
        linksIndex[path].push(...links);
      }
    }

    await resolveAutoTitle(linksIndex);

    return { linksIndex };
  },
});
