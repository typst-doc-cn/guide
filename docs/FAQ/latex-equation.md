---
tags: [equation]
---

# 如何使用 latex 公式？

使用 [mitex 包](https://typst.app/universe/package/mitex/)

```typst
#import "@preview/mitex:0.2.4": *

Write inline equations like #mi("x") or #mi[y].

Also block equations (this case is from #text(blue.lighten(20%), link("https://katex.org/")[katex.org])):

#mitex(`
  \newcommand{\f}[2]{#1f(#2)}
  \f\relax{x} = \int_{-\infty}^\infty
    \f\hat\xi\,e^{2 \pi i \xi x}
    \,d\xi
`)
```
