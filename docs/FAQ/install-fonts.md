---
tags: [font]
---
# 如何设置（中文）字体？

首先，在源代码文件中需要使用类似 `#set text(font: "LXGW WenKai", lang: "zh")` 的命令设置字体（此处使用霞鹜文楷）。然后根据环境配置字体文件的搜索方式：

- 在 typst.app 上编辑：直接上传字体文件。如果不方便上传字体，可以使用自带的 `#set text(font: ("New Computer Modern", "Noto Serif CJK SC"), lang: "zh")`。
- 在本地 VS Code 引入字体：默认可以使用系统安装的字体。除此以外，也可以通过给 tinymist 指定设定值 `tinymist.fontPaths` 等使它找到字体文件位置。不过注意使用 VS Code 打开单文件（区别于打开文件夹）时这一功能可能不可用。
- 使用 Typst CLI：使用 `--font-path` 参数。

## 设置的字体未生效？

一般编译时会警告`warning: unknown font family: …`，可按提示排查问题。

1. 如果**全篇**都无效，请检查字体**名称**是否有误

   可用`typst fonts`列出所有字体的名称。（可能要加选项指定字体目录：`typst fonts --font-path path/to/your-fonts`）

2. 如果**只是粗体**、斜体无效，请保证字体有所需**变体**

   可用`typst fonts --variants`查看字体变体。

   若缺少，请检查是否完全安装了字体；确实没有可考虑用其它方法补救：[粗](./chinese-bold.md)、[斜](./chinese-skew.md)。

   <details>
   <summary><code>typst fonts --variants</code>输出示例</summary>

   以下 Source Han Serif 有多种字重（weight），支持加粗；

   ```
   Source Han Serif
   - Style: Normal, Weight: 250, Stretch: 100%
   - Style: Normal, Weight: 300, Stretch: 100%
   - Style: Normal, Weight: 400, Stretch: 100%
   - Style: Normal, Weight: 500, Stretch: 100%
   - Style: Normal, Weight: 600, Stretch: 100%
   - Style: Normal, Weight: 700, Stretch: 100%
   - Style: Normal, Weight: 900, Stretch: 100%
   ```

   而以下 SimSun 只有 400 一种常规字重，不支持加粗；

   ```
   SimSun
   - Style: Normal, Weight: 400, Stretch: 100%
   ```

   至于以下 Source Han Sans CN VF 则是可变字体（variable font），[尚不支持](https://github.com/typst/typst/issues/185)，显示只有 250 一种特殊字重，基本不可用。

   ```
   Source Han Sans CN VF
   - Style: Normal, Weight: 250, Stretch: 100%
   ```
   </details>
