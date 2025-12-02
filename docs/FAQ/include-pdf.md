---
tags: [tool, pdf]
links:
  - https://github.com/typst/typst/issues/6644
---

# 能否嵌入 PDF 文件？

::: tip ✅ Typst 0.14 已改进

[#6623](https://github.com/typst/typst/pull/6623) 已经支持直接`image("file.pdf", page: 5, width: …)`，详见 [Image Function – Typst Documentation](https://typst.app/docs/reference/visualize/image/#parameters-format)。

不过尚不支持获取 PDF 总页数。

:::

Typst 0.13 及之前[不支持](https://forum.typst.app/t/how-can-i-insert-content-from-a-pdf-into-my-document/476)，但是你可以先使用以下任意一种方法将 PDF 文件转换为 SVG 文件，然后嵌入 SVG 文件。
- [在线工具](https://cloudconvert.com/pdf-to-svg)
- 可视化编辑工具 [inkscape](https://inkscape.org/)
- 命令行转换工具 [pdf2svg](https://github.com/dawbarton/pdf2svg)，linux 版本可以直接使用包管理器安装；[windows 版本](https://github.com/jalios/pdf2svg-windows)。
- 用 [muchpdf](https://typst.app/universe/package/muchpdf/) 包在 Typst 内转换（可能导致编译变慢）
