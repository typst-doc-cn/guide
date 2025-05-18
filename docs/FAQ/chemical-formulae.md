---
tags: tool
---

# 如何输入/排版化学反应方程式？

使用群友科技 typsium：https://typst.app/universe/package/typsium

```typst
#import "@preview/typsium:0.0.3": ce
#ce("[Cu(H2O)4]^(2+) + 4NH3 --> [Cu(NH3)4]^(2+) + 4H2O")
```

> [!NOTE] 另一方案
>
> 使用这个包：https://github.com/schang412/typst-whalogen
>
> ```typst
> #import "@preview/whalogen:0.3.0": ce
>
> $ #ce("HCl + H2O -> H3O+ + Cl-") $
> ```
