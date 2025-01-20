---
tags: [chinese, layout]
---
# 如何让几个汉字占固定宽度并均匀分布？

类似问题：如何实现分散对齐

放到 `box` 或 `block` 容器里，然后使用 `1fr` 把它们隔开即可。

```typst
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
