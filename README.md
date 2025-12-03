# Typst 中文社区导航

这里收集了一些官方文档和小蓝书中未提到的一些问题和小技巧，尤其是面向中文用户的。

- 主站：[GitHub Pages](https://typst-doc-cn.github.io/guide)
- 镜像站：[Cloudflare (guide.typst.dev)](https://guide.typst.dev)
- 镜像站：[Vercel (typst.dev/guide)](https://typst.dev/guide/)
- 测试站：[Netlify](https://luxury-mochi-9269a9.netlify.app/)

其中镜像站不定期手动更新，有时略滞后。

## 开发

1. 安装 [Typst CLI](https://typst.app/open-source/#download)（v0.14）。
2. 安装 [pnpm](https://pnpm.io)，然后运行`pnpm install`。
3. 运行`pnpm dev --open`并等待浏览器打开网页。

可选步骤：

- 如想完全复现例子，可参考[`download-fonts.sh`](./scripts/download-fonts.sh)。

- 如想编译网站中的零星旧例子，可下载 [Typst v0.13.1](https://github.com/typst/typst/releases/tag/v0.13.1)，将可执行文件重命名为`typst-0.13.1`或`typst-0.13.1.exe`，放到`$PATH`上。

- 如想在“另请参见”`<SeeAlso>`一栏解析 GitHub 链接的标题，请设置`$GITHUB_TOKEN`（仅用于访问 GitHub GraphQL API，故无需任何特殊权限；）。

编译的 Typst 例子有缓存。如需清除，可删除`./docs/generated/`目录。
