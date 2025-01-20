---
tags: [text]
---
# 如何实现波浪线下划线？

```typst
#let pat = pattern(size: (4pt, 3pt), path(
  stroke: blue+0.5pt,
  ((0%, 10%), (-20%, 0%)),
  ((50%, 40%), (-20%, 0%)),
  ((100%, 10%), (-20%, 0%)),
))
#underline(stroke: (thickness: 3pt, paint: pat), evade: false, offset: 2pt)[你说得对，但是 Genshin Impact 是]
```

::: warning
不推荐，不同阅读器对于 pattern 的支持情况不一样，显示效果可能有所区别。
:::
