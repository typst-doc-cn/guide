---
tags: [code, table]
---
# 跨页的表格如何显示“续表”？

## 手动方法

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

## 包起来

```typst
#import "@preview/pointless-size:0.1.2": zh

#set page(paper: "a8")

#let continue-table-state = state("continue-table")

#let header-attach-cell(columns) = table.cell(colspan: columns, {
  context if continue-table-state.get() != false {
    place(right + top, dy: -1.4em)[
      #set text(size: zh("五号"))
      续表
    ]
    v(-0.9em)
  } else {
    v(-0.9em)
    continue-table-state.update(true)
  }
})

#let continued-table = it => continue-table-state.update(false) + context {
  if it.children.any(c => c.func() == table.header) {
    return it
  }

  let meta = it.fields()
  meta.remove("children")

  let header = it.children.filter(c => c.func() == table.header)
  let cells = it.children.filter(c => c.func() != table.header)
  if header.len() == 0 {
    let columns = meta.columns.len()
    header = table.header(
      header-attach-cell(columns),
      ..cells.slice(0, columns),
    )
    cells = cells.slice(columns)
  } else {
    let columns = meta.columns.len()
    let children = if type(header) != array { header.children } else {
      header.map(h => h.children).flatten()
    }
    header = table.header(
      header-attach-cell(columns),
      ..children,
    )
  }

  return table(
    ..meta,
    header,
    ..cells,
  )
}

#show table: continued-table

#show figure: set block(breakable: true)

#set figure(numbering: "1-1")

#figure(table(
  columns: 4,
  stroke: red,
  ..range(50).map(str),
))

#figure(table(
  columns: 4,
  // table.header(),
  ..range(50).map(str),
))

#figure(table(
  columns: 4,
  // table.header(),
  ..range(50).map(str),
))
```
