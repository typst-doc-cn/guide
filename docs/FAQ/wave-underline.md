---
tags: [text]
---
# 如何实现波浪线下划线？

```typst
-- #set page(height: auto, margin: 1em)
#let pat = tiling(size: (4pt, 3pt), curve(
  stroke: blue + 0.5pt,
  curve.move((0%, 10%)),
  curve.cubic((20%, 0%), (30%, 30%), (50%, 30%), relative: true),
  curve.cubic(auto, (30%, -30%), (50%, -30%), relative: true),
))
#underline(stroke: (thickness: 3pt, paint: pat), evade: false, offset: 2pt)[你说得对，但是 Genshin Impact 是]
```

::: warning
不推荐，不同阅读器对于 pattern 的支持情况不一样，显示效果可能有所区别。
:::

> [!NOTE]
> 自 Typst 0.13，`tiling` 代替了 `pattern`。
