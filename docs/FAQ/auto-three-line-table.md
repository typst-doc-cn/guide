---
tags: [code, show, table]
---
# 能简单地通过show set等实现将原有的表格转换成三线表吗？

::: warning
不推荐，建议参考[手动使用 `table.hline()` 实现](./three-line-table.md)。
:::

```typst
#show: columns.with(2)

#let t = table(
  columns: 3,
  table.header(
    [$x$],
    [$y$],
    [$z$],
  ),

  [1], [2], [3],
  [1], [2], [3],
  [1], [2], [3],
)

#t

#set table(stroke: none)
#show table: it => {
  if table.hline() in it.children {
    return it
  }
  let children = it.children
  let new_children = ()
  for i in children {
    new_children += (i,)
    if repr(i).starts-with("header") {
      new_children += (table.hline(),)
    }
  }
  let meta = it.fields()
  meta.remove("children")
  return table(..meta, table.hline(),..new_children,table.hline())
}

#t
```
