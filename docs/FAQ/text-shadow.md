---
tags: [layout, text, code]
---

# 如何给文本增加阴影

没在 FAQ 找到前人造的轮子，遂自己造了个能用的。
过两天写个更高级的（挖坑）。

原理就是放置两个不同颜色的`text`，第一个的作为阴影在第二个的后面。

```typst
#let shadowed-text(shadow-color: gray, offset: (0.1em, 0.05em), it) = {
  box(
    stack(
      dir: ltr,
      spacing: 0pt,
      place(
        dx: offset.at(0),
        dy: offset.at(1),
        text(fill: rgb(shadow-color))[#it],
      ),
      text[#it],
    ),
  )
}

#shadowed-text[文本阴影]
#shadowed-text(shadow-color: "93b6d2", offset: (0.1em, 0.05em))[淡蓝色文本阴影]
```
