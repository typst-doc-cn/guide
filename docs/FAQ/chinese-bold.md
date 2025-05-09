---
tags: chinese
---
# 中文没有加粗

这是因为你使用的中文字体没有粗体字形。我们常用的宋体、黑体、楷体等都没有粗体字形。推荐使用支持粗体的字体，例如使用思源宋体和思源黑体。

```typst
#set text(font: ("Source Han Serif SC"))

现在可以使用*粗体*了

```

然而，某些场合可能必须使用宋体。Microsoft Word 通过给字体增加描边实现了“伪粗体”，若要实现与 Microsoft Word 同样的效果，可以使用 [`cuti` 包](https://typst.app/universe/package/cuti)：

```typst
#import "@preview/cuti:0.2.1": show-cn-fakebold
#show: show-cn-fakebold
#set text(font: ("Times New Roman", "SimSun"))

现在可以使用*伪粗体*了

```
