---
tags: [math]
---

# 如何输入一个特定编号的公式？

相关问题：如何手动给公式编号？类似 LaTeX 的 `\tag{}`。

设置 `numbering` 啊，传入一个返回你想要的内容的函数即可。

```typst
#set math.equation(numbering: "(1)")
$ f(x) $
#math.equation($g(x)$, block: true, numbering: n => "(foo)")
$ h(x) $
```
