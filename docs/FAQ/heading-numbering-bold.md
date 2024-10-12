---
tags: [heading, numbering]
---

# 如何实现标题编号罗马数字加粗，但是标题不加粗？

群友提问：这个标题，只需要第I卷这个几个字加粗，后面的不加粗怎么设置？（我改了后面的字体）

![6937c2da43f405eb64ecec42185199bb](https://github.com/user-attachments/assets/9ecd0a7d-1442-446c-aadb-6cb3aa7cad5d)

`#set heading(numbering: XXX)` 接受的是返回 `content` 的函数，所以

```typst
#set heading(numbering: n => strong(numbering("第 I 卷", n)))
#show heading: set text(weight: "regular")

#heading("你说得对")

#heading("但是原神")
```
