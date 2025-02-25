---
tags: [table]
---

# 如何实现圆角表格？

使用 `block` 提供的 `radius` 即可实现圆角，结合 `clip` 参数可以去除不需要的部分。为了实现样式的统一 `stroke` 需要提前定义。

```typst
-- #set page(width: 10cm, height: auto)
#let stroke = stroke(2pt + gradient.linear(..color.map.plasma))
#show table: it => block(stroke: stroke, radius: 2em, clip: true, it)

#table(
  columns: (1fr,) * 5,
  rows: 3em,
  stroke: stroke,
  align: (x, y) => {
    if (calc.odd(x + y)) {
      left + top
    } else {
      right + bottom
    }
  },
  [A], [B], [C], [D], [E],
  [F], [G], [H], [I], [J],
  [K], [L], [M], [N], [O],
  [P], [Q], [R], [S], [T],
  [U], [V], [W], [X], [Y],
  [Z],
)
```
