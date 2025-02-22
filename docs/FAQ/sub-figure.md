---
tags: [layout, figure]
---
# 如何实现子图？子图与 `i-figured`编号冲突怎么办？

## 方法 1：手动编号（推荐）

这个编号不需要经常修改，因此使用 `grid` 布局，然后手动编号即可。

```typst
#set page(width: 12cm, height: auto)
#figure(grid(columns: 2, gutter: 1em,
  figure(rect(), numbering: none, caption: [a) demo1]),
  figure(rect(), numbering: none, caption: [b) demo2]),
), caption: [without considering counting subplots or using subplot indexes]) <fig:test1>

@fig:test1 (a) is xxx
```

## 方法 2：使用 subpar 包

https://typst.app/universe/package/subpar/

```typst
#set page(width: 12cm, height: auto)
#import "@preview/subpar:0.2.1": grid as subfigure
#subfigure(
  align:center,
  figure(rect(), caption: [
    An image of the andromeda galaxy.
  ]), <test2-a>,
  figure(rect(), caption: [
    A sunset illuminating the sky above a mountain range.
  ]), <test2-b>,
  columns: (1fr, 1fr),
  caption: [subpar implementation effect],
  label: <test2>,
)

*subpar displays*: Above in @test2, we see a figure which is composed of two other figures, namely @test2-a and @test2-b.
```

## 常见问题1：如果使用 `i-figured` 进行分章节计数，子图编号序号会不正常计数，比如：

**情况1：** `i-figured `会忽略 `figure` 的 `numbering`，导致出现计数错误

```typst
#set page(width: 12cm, height: auto)
#import "@preview/i-figured:0.2.4"
#show figure: i-figured.show-figure
#figure(grid(columns: 2, gutter: 1em,
  figure(rect(), numbering: none, caption: [a) demo1]),
  figure(rect(), numbering: none, caption: [b) demo2]),
), caption: [Conflict between raw grid and i-figured]) <fig:test3>
```

**情况2**：`i-figured` 会对 `subpar` 中超图进行冲突计数

```typst
#set page(width: 12cm, height: auto)
#import "@preview/i-figured:0.2.4"
#show figure: i-figured.show-figure
#import "@preview/subpar:0.2.1": grid as subfigure
#subfigure(
  align:center,
  figure(rect(), caption: [
    An image of the andromeda galaxy.
  ]), <test4-a>,
  figure(rect(), caption: [
    A sunset illuminating the sky above a mountain range.
  ]), <test4-b>,
  columns: (1fr, 1fr),
  caption: [A figure composed of two sub figures.],
  label: <test4>,
)

*subpar displays*: Above in @fig:test4, we see a figure which is composed of two other figures, namely @fig:test4-a and @fig:test4-b.
```

**正确用法：** 使用subpar实现子图超图功能，自行实现编号规则

```typst
#set page(width: 20cm, height: auto)
// Synopsis:
// - adding contextual numbering like chapter-relative numbering preserves the correct subfigure
//   numbering and supplements

#let fake-image = block(stroke: red, inset: 1em, lorem(10))
#import "@preview/subpar:0.2.1"

#let sub-figure-numbering = (super, sub) => numbering("1.1a", counter(heading).get().first(), super, sub)
#let figure-numbering = super => numbering("1.1", counter(heading).get().first(), super)
#let equation-numbering = super => numbering("(1.1)", counter(heading).get().first(), super)

#set heading(numbering: "1.1")
#show heading.where(level: 1): it => {
  counter(math.equation).update(0)
  counter(figure.where(kind: image)).update(0)
  counter(figure.where(kind: table)).update(0)
  counter(figure.where(kind: raw)).update(0)
  it
}
#show figure.caption: it => {
  let pattern = "^[^:]+" + sym.space.nobreak + "[\d.]+"
  show regex(pattern): strong
  show regex(pattern): emph
  // show regex(pattern): set text(weight: "bold")
  // show regex(pattern): set text(style: "italic")
  it
}

#show figure: set figure(numbering: figure-numbering)
#show math.equation: set math.equation(numbering: equation-numbering)

#let subpar-grid = subpar.grid.with(
  numbering: figure-numbering,
  numbering-sub-ref: sub-figure-numbering,
)

#outline(target: figure.where(kind: image))
#outline(target: figure.where(kind: table))

= Chapter

#figure(
  table(
    columns: 4,
    stroke: none,
    table.hline(),
    [t], [1], [2], [3],
    table.hline(stroke: .5pt),
    [y], [0.3s], [0.4s], [0.8s],
    table.hline(),
  ),
  caption: [三线表],
) <timing-tlt>

$ phi.alt := (1 + sqrt(5)) / 2 $ <ratio>

#figure(fake-image, caption: [aaa])

#subpar-grid(
  figure(fake-image, caption: [Inner caption]), <a>,
  figure(fake-image, caption: [Inner caption]), <b>,
  columns: (1fr, 1fr),
  caption: [Outer caption],
  label: <full1>,
)

#figure(fake-image, caption: [aaa])

#subpar-grid(
  figure(`adas`, caption: [Inner caption]), <c>,
  figure(fake-image, caption: [Inner caption]), <d>,
  columns: (1fr, 1fr),
  caption: [Outer caption],
  label: <full2>,
)

= Another Chapter
$ phi.alt := (1 + sqrt(5)) / 2 $ <ratio2>
#figure(
  table(
    columns: 4,
    stroke: none,
    table.hline(),
    [t], [1], [2], [3],
    table.hline(stroke: .5pt),
    [y], [0.3s], [0.4s], [0.8s],
    table.hline(),
  ),
  caption: [三线表],
) <timing-tlt1>

#figure(fake-image, caption: [aaa])

See @full1, @a and @b.

See also @full2, @c and @d.
```
