---
tags: [text]
---
# 为什么下划线不显示？

下划线后面必须有内容才会显示，你可以加上个 `sym.zws`（零宽空格）。

TODO: 后面两个例子未整理，先放在这里。

```typst
例 1：#underline[#(" " * 20)]

例 2：#underline[#(" " * 20)#sym.zws]

#let uline(n) = underline(n * "\u{3000}" + sym.zws)
姓名：#uline(6)

#let uline2(width, body) = box(body, width: width, stroke: (bottom: 0.5pt), outset: (bottom: 2pt))
学号：#uline2(6em)[114514]
```
