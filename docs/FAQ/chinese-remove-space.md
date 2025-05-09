---
tags: [layout, text]
---

# 写中文文档时，如何去掉源码中换行导致的空格？

0.12 可以玩 `regex` 魔法了，`regex` 现在可以跨不同的 `text`

```typst
测试一下，
效果怎么样。

#show regex("[\p{sc=Hani} 。 ； ， ： “ ”（ ） 、 ？ 《 》] [\p{sc=Hani} 。 ； ， ： “ ”（ ） 、 ？ 《 》]"): it => {
  let (a, _, b) = it.text.clusters()
  a + b
}

测试一下，
效果怎么样。
```
