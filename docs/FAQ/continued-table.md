---
tags: [code, table]
---

# 跨页的表格如何显示“续表”？

```typst
#let xubiao = state("xubiao")
#set table(stroke: (x, y) => {
  if y == 0 {none} else {1pt}
})
#show table: it => xubiao.update(false) + it

#table(
  columns: 3,
  table.header(
    table.cell(colspan: 3, {
      context if xubiao.get() {
        align(right)[续表]
      } else {
        v(-0.9em)
        xubiao.update(true)
      }
    }),
    [标题1], [标题2], [标题3],
  ),
  ..for i in range(5){
    ([11111], [22222], [33333],)
  }
)
```
