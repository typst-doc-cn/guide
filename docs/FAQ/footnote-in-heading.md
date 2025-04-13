---
tags: [heading, outline]
---

# 如何避免标题中的脚注显示在目录里？

在标题中使用 `footnote` 会导致目录中也显示 `footnote`，如何避免？

```typst
-- #set page(width: 10cm, height: auto)
#let show-footnote = state("show-footnote", true)
#let footnote(..args) = context if show-footnote.get() { std.footnote(..args) }
#show outline: it => {
  show-footnote.update(false)
  it
  show-footnote.update(true)
}

#outline()

= Heading#footnote[123]

#heading(outlined: false, [I'm not willing to be outlined!])

#heading(outlined: true, [I wanna be outlined!#footnote[emmm.]])

```
