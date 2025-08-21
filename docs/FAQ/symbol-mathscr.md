---
tags: [math, font]
---
# 如何实现 mathscr 的花体符号？

可用如下办法实现 LaTeX 的`\mathscr`花体。

## 局部使用

```typst
-- #set page(height: auto)
#let scr(it) = text(
  stylistic-set: 1,
  box($cal(it)$),
)

We establish $cal(P) != scr(P)$.
```

来源：[`cal` - Variants Functions – Typst Documentation](https://typst.app/docs/reference/math/variants#functions-cal)。

## 全局设置

```typst
#set text(stylistic-set: 1)

$ cal(L){f(t)} = integral_(t = 0)^oo f(t) e^(- s t) dif t $
```
