import { createContentLoader } from 'vitepress';
import { makeTags } from './utils';

export interface PostData {
  title: string;
  url: string;
  tags: string[];
}

export interface Data {
  posts: PostData[];
  postMap: { [key: string]: PostData };
  tagMap: { [key: string]: PostData[] };
}

declare const data: Data;
export { data };

export default createContentLoader('FAQ/*.md', {
  includeSrc: true,
  transform(rawData): Data {
    const postMap = {};
    const tagMap = {};

    const posts = rawData.map(({ src, url, frontmatter }) => {
      // get the title from md source code
      const title_from_src = src?.match(/^# (.*)$/m)?.[1];
      if (!title_from_src) {
        console.warn(`Failed to find title for ${url}; fall back to the URL.`);
      } else if (title_from_src.includes('`')) {
        console.warn(
          [
            `The title for ${url} contains markdown: ${title_from_src}.`,
            '    It will NOT be rendered due to technical limitations. (https://github.com/typst-doc-cn/guide/issues/60)',
            '    Please remove back quotes (`) or replace them with plain quotes (“”).',
          ].join('\n'),
        );
      }
      const title = title_from_src ?? url;

      const result = {
        title,
        url,
        tags: makeTags(frontmatter.tags),
      };
      result.tags.forEach((tag) => (tagMap[tag] ??= []).push(result));
      postMap[result.url] = result;
      return result;
    });

    return { posts, postMap, tagMap };
  },
});
