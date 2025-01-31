# 面向 Word 用户的快速入门向导

::: tip
在阅读本文前，请确保你已经了解了 [Typst](https://typst.app/) 是什么并且已经[安装了 Typst 的运行环境](https://typst-doc-cn.github.io/tutorial/introduction.html)。
:::

大家能看到这篇文章，或多或少都是因为对于排版或者样式定制有一定的需求。这篇文章将会帮助你快速上手 Typst 并且开始使用 Typst 的排版功能。

Word 是一个开箱即用、所见即所得的软件，而其弊端就在于其排版的不稳定性以及将文章视为「一系列格式各异的元素」。而 Typst 或 LaTeX 相较之下则将文章视为「一系列逻辑结构」，通过定义逻辑结构、约束不同结构的样式来实现排版，将内容的写作与样式的定义分离开来。因此，在使用 Typst 时，更多时候会关注于文章内容结构本身，对于常规的样式则几乎是一个「一劳永逸」的过程（非常规指的是复杂需求的排版，比如绘图、批注等等）。

本文将会介绍 Typst 中的一些常用样式设置，以及如何将 Word 中的样式迁移到 Typst 中。

::: tip
本文会使用绿色的 TIP 穿插一些关于 Typst 的基础知识，但不会过多展开。
:::

## 开始

你可以任意复制一段文本到 Typst 中，然后按照本文的指导进行样式设置。

## 字体

在复制一段中文文本后，你可能会发现这样的问题：

![为什么中文字体这么奇怪](./images/20240715132539.png)

由于 Typst 并非由国人设计，它的默认字体并不适合中文排版。因此，我们需要对 Typst 的字体进行一些设置。在文章的开头，我们可以使用 `#set text(font: "Noto Sans CJK SC", lang: "zh", region: "cn")` 来设置文章正文的字体为「思源黑体」、语言为「中文」、地区为「中国」。这样，我们就可以保证中文的排版效果。如果你需要使用其他字体，可以参考 [为什么中文字体这么奇怪](./FAQ/install-fonts.md)。

要调整正文字体的大小，可以使用 `#set text(size: 12pt)` 来设置字体大小为 12 磅。

```typst no-render
#set text(font: "Noto Sans CJK SC", lang: "zh", region: "cn", size: 12pt)
```

::: tip
这里的 `#` 是 Typst 由默认的内容模式进入命令模式的标志。在这里，我们使用 `set` 命令设置文本 `text` 的参数。参数是一系列的键值对，用冒号 `:` 分隔。在这里，我们设置了 `font`、`lang`、`region` 和 `size` 四个参数。
:::

为了与 Word 中的字号相对应，你也可以使用 pointless-size 包，如以下代码所示：

```typst no-render
#import "@preview/pointless-size:0.1.0": zh, zihao

#set text(size: zh(5)) // 五号（10.5pt）
```

::: tip
包是 package 的翻译，是一些由 Typst 社区提供的功能扩展。在 Typst 中，你可以通过 `#import` 命令引入包，然后使用包中的功能。在这里，我们引入了 `pointless-size` 包，并使用了其中的 `zh` 函数来设置字号。
:::

pointless 包中更多的字号与命令的对应请参考下图：

![字号对照表](https://private-user-images.githubusercontent.com/73375426/368226483-585d3016-5e7e-46fe-8e16-befcfe1ee6a3.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzgzNDAxNDYsIm5iZiI6MTczODMzOTg0NiwicGF0aCI6Ii83MzM3NTQyNi8zNjgyMjY0ODMtNTg1ZDMwMTYtNWU3ZS00NmZlLThlMTYtYmVmY2ZlMWVlNmEzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAxMzElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMTMxVDE2MTA0NlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTk0OTcxZmI3YTUxZWI2MzQxOThjOTMyZTI3OTIyNTg3ZTg4MTA1MmM3NDM4OTZmMmNmZDZjMmFmMTYzMmE1YTAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.R0IRsouGVjW7zFnblNkK0DJwsOYJCdG2-ERIa0UPSBE)

## 段落、行距

## 标题

参照 Word 段落对话框

### 对齐方式

```typst
#set align(left)
这行字左对齐

#set align(right)
这行字右对齐

#set align(center)
这行字居中

```

### 大纲级别

参见 [标题](#标题) 章节

### 缩进
