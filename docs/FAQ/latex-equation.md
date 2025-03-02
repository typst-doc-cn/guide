---
tags: [equation]
---

# 如何使用 LaTeX 公式？

使用 [mitex 包](https://typst.app/universe/package/mitex/)

```typst
-- #show link: set text(blue.lighten(20%))
-- #set page(width: auto, height: auto, margin: 1em)
#import "@preview/mitex:0.2.5": *

Write inline equations like #mi("x") or #mi[y].

Also block equations (this case is from #link("https://katex.org/")[KaTeX]):

#mitex(`
  \newcommand{\f}[2]{#1f(#2)}
  \f\relax{x} = \int_{-\infty}^\infty
    \f\hat\xi\,e^{2 \pi i \xi x}
    \,d\xi
`)
```
