---
tags: [word, layout]
---

# 如何实现 Word 中的两倍行距？

根据 Typst 作者 [@laurmaedje](https://github.com/laurmaedje) 的 [回答](https://github.com/typst/typst/issues/106#issuecomment-2041051807)：

```typst
#set text(top-edge: 0.7em, bottom-edge: -0.3em)
#set par(leading: 1em)

#lorem(6)

#lorem(7)
```
