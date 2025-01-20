---
tags: [math, code, layout]
---

# 长公式换行后，上标的位置不对

可以使用宽度为 0 的 `box` 来提高上标的位置凑合一下，像下面第 3 个公式一样。

```typst
#set page(height: auto)

$ [sum a / b + \ c]^2 $

$ [sum a / b + \ c]""^2 $

$ [sum a / b + \ c]#box(height: 1em)^2 $
```
