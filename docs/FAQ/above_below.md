---
tags: [layout, heading]
---
# 如何增加标题前后的距离？类似于 Word 的段前段后

设置 `block` 的 `above` 和 `below`。如果只需要改标题的就和 `#show heading` 配合使用，例如

```typst
#show heading.where(level: 1): set block(below: 2em)

= 标题
标题后面的距离增加了
```

另外注意这个距离会塌陷，例如第一段设置 `below: 2em`，第二段设置 `above: 3em`，则最后得到的距离取大的那个而不是加和，即 `3em`。
