---
tags: [list, layout, bug]
---

# 修复列表的终极方案

Typst 当前版本容易遇到列表编号或者符号与内容错位的问题。归根到底是因为当前列表的底层实现是 `grid`，编号和内容在同一行的两个格子中，它们之间自然没有 `baseline` 约束。要让它们能够基线对齐，最直接的方法就是使用 `par` 来排版。

@Andrew 在论坛上给出了 [解决方案](https://forum.typst.app/t/how-to-make-bullet-list-item-bodies-flow-like-paragraphs/3756/3) 。

```typst
-- #set page(height: auto, width: 14cm)
#show: correctly-indent-list-and-enum-items
#set enum(indent: 1em)

+ #lorem(12)
  + #lorem(12)
  + #lorem(12)
+ #lorem(12)
+ #lorem(12)
```

如果需要排版成原本列表的样子，可以通过设置段落的悬挂缩进来实现，例如 `#set par(hanging-indent: 1.2em)`。
