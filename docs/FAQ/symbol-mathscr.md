---
tags: [math]
---
# 如何实现 `\mathscr` 的花体符号？

群友提问：话说 typst 未来可以支持 latex 的一些数学字体，比如 mathscr 的花体，感觉确实帅

```typst
#set text(stylistic-set: 1)

$ cal(L){f(t)} = integral_(t = 0)^oo f(t) e^(- s t) dif t $
```
