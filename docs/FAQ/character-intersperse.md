---
tags: [chinese, layout, text]
---
# 如何让几个汉字占固定宽度并均匀分布？

类似问题：如何实现分散对齐或均排。

## 自动方法：结尾强制 justify

放入容器并指定宽度，然后追加[`linebreak(justify: true)`](https://typst.app/docs/reference/text/linebreak/#parameters-justify)。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
#let distr(width: 5em, body) = block(
  width: width,
  body + linebreak(justify: true), // [!code highlight]
)

#distr[姓名]
#distr[身份证]
#distr[详细地址]
```

《现代汉语词典》第7版1788页附录的实际例子：

```typst
-- #set page(width: auto, height: auto, margin: 1em)
#set table(
  align: center + horizon, // [!code highlight]
  stroke: (x, y) => if x > 0 { (left: (dash: "dotted", thickness: 0.5pt)) } + if y > 0 { (top: 0.5pt) },
  inset: (x: 1em, y: 0.5em),
)

#table(
  columns: 3,
  table.hline(),
  table.header(..([*量的名称*], [*单位名称*], [*单位符号*]).map(h => box(width: 5em, h + linebreak(justify: true)))),
  ..(
    ([速度], [节], [kn]),
    ([质量], [吨 \ 原子质量单位], [t \ u]),
    ([体积], [升], [L, (l)]),
    ([能], [电子伏], [eV]),
    ([级差], [分#h(1em)贝], [dB]),
    ([线密度], [特#h(-0.5em)〔克斯〕], [tex]),
    ([土地面积], [公顷], [hm², (ha)]),
  )
    .map(((first, ..rest)) => (first + linebreak(justify: true), ..rest)) // [!code highlight]
    .flatten(),
  table.hline(),
)
```

## 手动方法：中间间隔 1fr

放到 `box` 或 `block` 容器里，然后使用 `1fr` 把它们隔开即可。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
#let distr(s, w: auto) = {
  block(
    width: w,
    stack(
      dir: ltr,
      ..s.clusters().map(x => [#x]).intersperse(1fr),
    ),
  )
}

#distr("姓名", w: 6em)
#distr("身份证", w: 6em)
#distr("详细地址", w: 6em)
```

另一个在表格里的例子

```typst
#table(
  columns: (6em, 1fr), ..(
    [甲方],
    [你的头],
    [承担方],
    [怎么尖尖的],
    [这里五个字],
    [那我问你],
  )
    .enumerate()
    .map(((i, e)) => if calc.even(i) {
      e.text.clusters().intersperse(h(1fr)).join()
    } else { e })
)
```
