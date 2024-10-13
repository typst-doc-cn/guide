---
title: 如何让页脚的页码显示为“第 1 页/共 N 页”，同时目录中的页码使用阿拉伯数字？
tags: [page, numbering]
---

为了方便起见，还是用 `numbly`

```typst
#import "@preview/numbly:0.1.0": numbly
#set text(lang: "zh")
#set page(numbering: numbly("{1}", "第{1}页/共{2}页"))
#outline()
= 你说得对
== 但是原神
```
