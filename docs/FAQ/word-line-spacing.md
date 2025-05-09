---
tags: [word, layout]
---
# 如何实现 Word 中的两倍行距？

类似问题：如何实现 Word 中的 1.5 倍行距？如何实现和 Word 模板相同的行距？

根据 Typst 作者 [@laurmaedje](https://github.com/laurmaedje) 的 [回答](https://github.com/typst/typst/issues/106#issuecomment-2041051807)：

```typst
#set text(top-edge: 0.7em, bottom-edge: -0.3em)
#set par(leading: 1em)

#lorem(6)

#lorem(7)
```

补充说明：实际上，不要纠结那些换算公式了。最推荐的做法是，写满一页纸，然后调整 `leading` 数值，使 typst 中一页纸能排版的行数与 word 中相同即可。
