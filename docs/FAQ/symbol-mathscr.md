---
tags: [math, font]
---
# 如何实现 mathscr 的花体符号？

::: tip ✅ Typst 0.14 已改进
[#6309](https://github.com/typst/typst/issues/6309) 已添加[`scr`函数](https://typst.app/docs/reference/math/variants#functions-scr)，对于某些数学字体（包括默认字体在内），可直接使用。

```typst
-- #set page(height: auto, width: auto, margin: 1em)
$scr(L) != cal(L)$.
```
:::

对于其它字体，可用如下办法实现 LaTeX 的`\mathscr`花体。

## 局部使用

```typst
-- #set page(height: auto)
#let scr(it) = text(
  stylistic-set: 1,
  $cal(it)$,
)

We establish $cal(P) != scr(P)$.
```

来源：[`scr` - Variants Functions – Typst Documentation](https://typst.app/docs/reference/math/variants#functions-scr)。

## 全局设置

```typst
#set text(stylistic-set: 1)

$ cal(L){f(t)} = integral_(t = 0)^oo f(t) e^(- s t) dif t $
```
