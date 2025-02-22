---
tags: [math, equation, text]
---

# 如何修改公式里的中文字体？

使用 `regex("\p{script=Han}")` 匹配中文，不太优雅，但是目前没有更好的方法。

```typst
-- #set page(height: auto, margin: 1em)
#show math.equation: it => {
  show regex("\p{script=Han}"): set text(font: "Source Han Serif SC")
  it
}
$ f(x) #[原神] $
```
