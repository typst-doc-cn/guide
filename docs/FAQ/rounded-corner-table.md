---
tags: [table]
---

# 如何实现圆角表格？

原理是隐藏了表格边框处单元格的外围线条，使用 block 提供的 radius 实现圆角。

```typst
#set page(width: 6cm, height: auto)

#let rounded_table(
  columns: none,
  rows: 1,
  stroke: stroke(black + 1pt),
  radius: 8pt,
  fill: none,
  align: top + left,
  ..cells,
) = {
  let column-num = if type(columns) == int { columns } else if type(columns) == array { columns.len() } else { 1 }
  let row-num = if type(columns) == int { calc.ceil(cells.pos().len() / columns) } else if type(columns) == array {
    calc.ceil(cells.pos().len() / columns.len())
  }
  block(
    stroke: stroke,
    radius: radius,
    table(
      columns: columns,
      rows: rows,
      stroke: (x, y) => if (x == 0) {
        // first column
        if (y == row-num - 1) {
          (right: stroke)
        } else {
          (right: stroke, bottom: stroke)
        }
      } else if (y == 0) {
        // first row
        if (x == column-num - 1) {
          (bottom: stroke)
        } else {
          (right: stroke, bottom: stroke)
        }
      } else if (y == row-num - 1) {
        // last row
        if (x == column-num - 1) {
          none
        } else {
          (right: stroke)
        }
      } else if (x == column-num - 1) {
        // last column
        if (y == row-num - 1) {
          none
        } else {
          (bottom: stroke)
        }
      } else {
        stroke
      },
      align: align,
      ..cells
    ),
  )
}

#rounded_table(
  columns: (1fr,) * 5,
  rows: (2em,),
  radius: 2em,
  stroke: stroke(2pt + gradient.linear(..color.map.rainbow)),
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
