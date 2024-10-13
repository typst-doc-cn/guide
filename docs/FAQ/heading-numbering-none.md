---
title: 如何让某个标题不编号？例如参考文献
tags: [heading, numbering]
---

手动调用 `heading(numbering: none)`，例如

```typst
#set heading(numbering: "第1章")

= 背景

#heading(numbering: none)[参考文献]

```
