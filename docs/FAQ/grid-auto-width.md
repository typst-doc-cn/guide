---
tags: layout
---

# 根据内容自动设置 grid 列数

可用[`layout`](https://typst.app/docs/reference/layout/layout/)获得可用宽度，用`measure`测量内容宽度，计算出`grid`列数。

下例`choices`函数可排版选择题的选项，根据内容最大宽度自动设置列数。

```typst
#let choices(..the-choices, gutter: 1em) = layout(available => {
  let cell-width = calc.max(..the-choices.pos().map(it => measure(it).width))
  let ratio = (
    (available.width + gutter).to-absolute().pt()
      / (cell-width + gutter).to-absolute().pt()
  )
  let n = calc.min(4, calc.floor(ratio))
  if n == 3 { n = 2 }

  grid(
    columns: (1fr,) * n,
    gutter: gutter,
    ..the-choices
  )
})

#set page(width: 20em, margin: 1em, height: auto)

= 每行一项共四行
#choices[春江潮水连海平！！！！][B][C][D]

= 每行两项共两行
#choices[春江潮水连海平][B][C][D]

= 每行四项共一行
#choices[春江潮][B][C][D]
```
