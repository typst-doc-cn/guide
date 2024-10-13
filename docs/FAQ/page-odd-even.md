---
title: 如何实现页眉页脚奇偶页不同？
tags: [page, counter]
---

设置页眉页脚时，可以使用 `if`，同时因为这个操作是上下文相关的（我们需要知道此时的页码，也就是 `counter(page)` 的值），所以还要使用 `context`，即 `context if`。

以页脚为例，如果想要实现奇数页页码在右边，偶数页页码在左边，可以这样实现

```typst
#set page(footer: context if calc.even(counter(page).get().first()) {
  counter(page).display("1")
} else {
  h(1fr)
  counter(page).display("1")
})

奇数页

#pagebreak()

偶数页
```
