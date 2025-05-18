---
tags: [layout]
---

# 如何实现左对齐-居中-右对齐的布局

使用 `h(1fr)` 即可。不过两边长度不一样的时候，居中的文字会歪，如果需要完美的居中，可以用 `place` 把两行叠起来。

```typst
左对齐#h(1fr)居中#h(1fr)右对齐

左#h(1fr)歪了#h(1fr)右对齐

#place[左#h(1fr)右对齐]#align(center)[居中]
```

不过群友反馈似乎用在 `header` 里有问题，那就再来一次 `place`

```typst
#set page(header: {
  place[左对齐#h(1fr)右对齐]
  place[#h(1fr)居中#h(1fr)]
})
```
