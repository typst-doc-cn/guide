import { createContentLoader, withBase } from 'vitepress';
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

    const titleRegex = /^# (.+)$/m;

    const posts = rawData.map(({ url, frontmatter, src }) => {
      const title =
        frontmatter.title ??
        (src && titleRegex.exec(src)?.[1]) ??
        '<unknown title>';
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
