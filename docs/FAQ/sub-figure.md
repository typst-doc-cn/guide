---
tags: [layout, figure]
---
# 如何实现子图？

### 方法 1：手动编号（推荐）

这个编号不需要经常修改，因此使用 `grid` 布局，然后手动编号即可。

```typst
#figure(grid(columns: 2, gutter: 1em,
  figure(rect(), numbering: none, caption: [a) demo1]),
  figure(rect(), numbering: none, caption: [b) demo2]),
), caption: [demo]) <fig:demo>

@fig:demo (a) is xxx
```

### 方法 2：使用 subpar 包

https://typst.app/universe/package/subpar/

不推荐的原因是这种魔法包和其他包的兼容性可能不好。
