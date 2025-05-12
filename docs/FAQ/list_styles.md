---
tags: [code, list]
---

# 如何为列表的每个层级指定不同的样式？

群友的魔法

```typst
#let styled-list(..funcs, body, applied: x => x) = {
  let funcs = funcs.pos()
  body.children.map(x => {
    if x.func() != list.item {
      applied(x)
    } else {
      let body = if x.body.func() == [].func() {
        styled-list(
          ..funcs.slice(1),
          funcs.at(0),
          x.body,
          applied: funcs.at(0)
        )
      } else {
        funcs.at(0)(x.body)
      }
      list.item(body)
    }
  }).sum()
}

#styled-list(
  it => {
    set text(red)
    it
  },
  it => {
    set text(green)
    it
  },
  it => {
    set text(blue)
    it
  },
)[
  - abcd
    - abcd
      - abcd
      - abcd
        - abcd
    - abcd
  - abcd
    - abcd
]
```


