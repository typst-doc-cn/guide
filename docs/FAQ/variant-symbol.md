---
tags: [math]
---
# 如何定义一个在 inline 公式与 display 公式中形式不同的符号？

如果你指的是求和或者积分符号那种，应直接用 `limits`

```typst
#let cfrac = $limits(inline: #false, upright(K))$

$cfrac_(i=1)^oo$

$ cfrac_(i=1)^oo $
```

更复杂的可以用 `state` 来实现

```typst
#let s = state("in-block", -1)

#show math.equation.where(block: true): it => {
  s.update(1)
  it
}

#show math.equation.where(block: false): it => {
  s.update(0)
  it
}

#let cfrac(x, y) = context {
  if s.get() == 0 {
    $upright(K)_#x^#y$
  }
  else if s.get() == 1 {
    $ limits(upright(K))_#x^#y $
  }
}

$cfrac(i=1, oo)$

$ cfrac(i=1, oo) $
```
