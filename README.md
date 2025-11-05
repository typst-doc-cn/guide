# Typst 中文社区导航

这里收集了一些官方文档和小蓝书中未提到的一些问题和小技巧，尤其是面向中文用户的。 

- 主站：https://typst-doc-cn.github.io/guide/ （GitHub Pages）
- 镜像站：https://guide.typst.dev/ （不定期手动更新）
- 测试站：https://luxury-mochi-9269a9.netlify.app/ （Netlify）

## 开发

1. 安装 [Typst CLI](https://typst.app/open-source/#download)（v0.14）。
2. 安装 [pnpm](https://pnpm.io)，然后运行`pnpm install`。
3. 运行`pnpm dev --open`并等待浏览器打开网页。

可选步骤：

- 如想完全复现例子，可下载[`fonts.7z`](https://github.com/typst-doc-cn/guide/releases/download/files/fonts.7z)，解压到`./fonts/`目录。
- 如想编译网站中的零星旧例子，可下载 [Typst v0.13.1](https://github.com/typst/typst/releases/tag/v0.13.1)，将可执行文件重命名为`typst-0.13.1`或`typst-0.13.1.exe`，放到`$PATH`上。

编译的 Typst 例子有缓存。如需清除，可删除`./docs/generated/`目录。
