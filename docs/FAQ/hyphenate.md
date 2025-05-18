---
tags: [layout, text]
---

# 长单词如何手动指定换行位置

使用 `-?` 标记

```typst
#let conword = [super-?long-?word-?is-?breakable]

#block(width: 200pt, conword)
#block(width: 100pt, conword)
#block(width: 40pt, conword)
#block(width: 10pt, conword)
```
