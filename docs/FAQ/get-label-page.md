# 如何获得标签所在页的页码？

其实就是获取计数器 `counter(page)` 在标签所在位置的值。

```typst
aaa <233>
#let my-link(l)=context link(l)[#counter(page).at(query(l).at(0).location()).at(0)]
aaa 在第 #my-link(<233>) 页
```

::: tip
另外注意，`counter(page).at(location)` 与 `location.position().page` 是不一样的。

前者是 `location` 位置的页码编号，这个编号可以被重置（例如第一章之前用罗马数字编号，之后用阿拉伯数字重新编号，此时可以使用 `counter(page).update(1)` 重置编号）。而后者是物理的页数，或者说，在第几张纸上。
:::
