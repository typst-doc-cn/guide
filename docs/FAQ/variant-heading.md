---
tags: [heading, numbering]
---
# 如何实现两种不同的一级标题？

作者：[@flaribbit](https://github.com/flaribbit)

```typst
#let topic_c = counter("topic")
#set heading(numbering: "第一章")
#let topic(body) = {
  topic_c.step()
  context heading(topic_c.display("专题一") + [ ] + body, numbering: none)
}

#outline()
= 你说得对
#topic[下载]
= 但是原神
#topic[安装]
#topic[卸载]
```
