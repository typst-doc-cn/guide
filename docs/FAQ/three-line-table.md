# 如何实现三线表？

使用 `stroke: none` 隐藏默认边框，然后使用 `table.hline()` 画线即可。

```typst
#table(
  columns: 3,
  stroke: none,
  table.hline(),
  table.header([a], [b], [c]),
  table.hline(stroke: 0.5pt),
  [d], [e], [f],
  [g], [h], [i],
  table.hline(),
)

```
