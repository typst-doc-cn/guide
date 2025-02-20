---
tags: [layout, text]
---

# 写中文文档时，如何去掉源码中换行导致的空格？

0.12 可以玩 `regex` 魔法了，`regex` 现在可以跨不同的 `text`

```typst
✓ 测试一下，效果怎么样。

✗ 测试一下，
效果怎么样。

// https://www.w3.org/TR/clreq/#table_of_punctuation_marks
#let han-or-punct = "[-\p{sc=Hani}。．，、：；！‼？⁇⸺——……⋯⋯～–—·・‧/／「」『』“”‘’（）《》〈〉【】〖〗〔〕［］｛｝＿﹏●•]"
#show regex(han-or-punct + " " + han-or-punct): it => {
  let (a, _, b) = it.text.clusters()
  a + b
}

✓ 测试一下，
效果怎么样。
```

::: details 微小副作用

在整个正则表达式匹配的边界，标点宽度会有问题。

```typst
#set page(width: auto, height: auto, margin: 1em)
#set text(font: ((name: "New Computer Modern", covers: "latin-in-cjk"), "Source Han Serif SC"))

✓“七斤嫂，你‘恨棒打人’。……”

✗“七斤嫂，你‘恨棒打人’。
……”

#show regex("[。] [……]"): it => {
  let (a, _, b) = it.text.clusters()
  a + b
}

✗“七斤嫂，你‘恨棒打人’。
……”
```

相关 issue：[Ignore linebreaks between CJK characters in source code · #792](https://github.com/typst/typst/issues/792)
:::
