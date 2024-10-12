---
tags: [font]
---

# 如何安装（中文）字体？

首先，在源代码文件中需要使用类似 `#set text(font: "LXGW WenKai", lang: "zh")` 的命令设置字体（此处使用霞鹜文楷）。然后根据环境配置字体文件的搜索方式：

- 在 typst.app 上编辑：直接上传字体文件。如果不方便上传字体，可以使用自带的 `#set text(font: ("New Computer Modern", "Noto Serif CJK SC"), lang: "zh")`。
- 在本地 VS Code 引入字体：默认可以使用系统安装的字体。除此以外，也可以通过给 tinymist 指定设定值 `tinymist.fontPaths` 等使它找到字体文件位置。不过注意使用 VS Code 打开单文件（区别于打开文件夹）时这一功能可能不可用。
- 使用 Typst CLI：使用 `--font-path` 参数。
