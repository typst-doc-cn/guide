---
title: 公式中的正体加粗和正体，是什么代码啊？
tags: [math]
---

也就是 LaTeX 中的 \mathbf 和 \mathrm

```typst
#let mathrm(x) = math.upright(x)
#let mathbf(x) = math.bold(math.upright(x))

$ y=3+4 mathrm(i) $

$ nabla times mathbf(H) $
```
