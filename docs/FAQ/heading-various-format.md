---
tags: [heading, numbering]
---

# 同一级标题采用不同的格式

请问, 同一级标题采用不同的格式, 应该看哪里的资料?

建议是搓两个 counter，自己写个函数处理

```typst
#let chapter(title) = {
  heading(
    level: 1,
    {
      counter("chapter").step()
      counter("chapter").display("第一章")
      h(0.3em)
      title
    },
  )
}

#let subject(title) = {
  heading(
    level: 1,
    {
      counter("subject").step()
      counter("subject").display("专题一")
      h(0.3em)
      title
    },
  )
}

#chapter("对")
#chapter("对")
#chapter("对")

#subject("好")

#chapter("对")
#chapter("对")

#subject("好")
```
