/**
 * typst 的发布历史
 *
 * 最近的在前。
 */
const typst_history: {
  publishedAt: Date;
  tagName: string;
}[] = [
  // 更新方法：
  // gh release --repo typst/typst list --json 'tagName,publishedAt' --exclude-pre-releases --limit 5
  { publishedAt: '2025-12-03T17:10:21Z', tagName: 'v0.14.1' },
  { publishedAt: '2025-10-24T12:27:35Z', tagName: 'v0.14.0' },
  { publishedAt: '2025-03-07T12:50:41Z', tagName: 'v0.13.1' },
  { publishedAt: '2025-02-19T16:25:41Z', tagName: 'v0.13.0' },
  { publishedAt: '2024-10-18T21:41:48Z', tagName: 'v0.12.0' },
  { publishedAt: '2024-05-17T15:33:15Z', tagName: 'v0.11.1' },
  { publishedAt: '2024-03-15T18:05:50Z', tagName: 'v0.11.0' },
  { publishedAt: '2023-12-04T15:51:31Z', tagName: 'v0.10.0' },
  { publishedAt: '2023-10-31T01:32:16Z', tagName: 'v0.9.0' },
  { publishedAt: '2023-09-13T15:45:00Z', tagName: 'v0.8.0' },
  { publishedAt: '2023-08-07T16:20:37Z', tagName: 'v0.7.0' },
  { publishedAt: '2023-06-30T15:04:25Z', tagName: 'v0.6.0' },
  { publishedAt: '2023-06-09T14:55:29Z', tagName: 'v0.5.0' },
  { publishedAt: '2023-05-20T20:40:20Z', tagName: 'v0.4.0' },
  { publishedAt: '2023-04-26T14:20:47Z', tagName: 'v0.3.0' },
  { publishedAt: '2023-04-11T20:39:55Z', tagName: 'v0.2.0' },
  { publishedAt: '2023-04-04T23:46:28Z', tagName: 'v0.1.0' },
].map(({ publishedAt, tagName }) => ({
  publishedAt: new Date(publishedAt),
  tagName,
}));

type TypstVersion = {
  /** typst 版本，以“v”开头 */
  version: string;
  /** 是否是最新版 */
  latest: boolean;
};

/**
 * 获取`date`时的 typst 版本
 * @param date
 * @returns 版本信息
 * @throws 若彼时尚未发布任何版本，会报错
 */
export function getTypstVersion(date: Date): TypstVersion {
  const found = typst_history.find(({ publishedAt }) => publishedAt < date);
  if (!found) {
    throw new Error(`failed to find any typst version before ${date}`);
  }

  return {
    version: found.tagName,
    latest: found.tagName == typst_history[0].tagName,
  };
}
