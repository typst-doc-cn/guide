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
      // 一般 title 用“# …”即可；
      // 不过偶尔用了markdown特殊语法，难以渲染，这时改用 frontmatter 手动指定
      const title = frontmatter.title ?? src?.match(/# (.*)/)?.[1] ??  url;
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
