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
  transform(rawData): Data {
    const postMap = {};
    const tagMap = {};

    const posts = rawData.map(({ url, frontmatter }) => {
      const title = frontmatter.title ?? url;
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
