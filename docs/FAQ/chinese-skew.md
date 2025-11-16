---
tags: [chinese, text]
---

# 如何设置中文字体的斜体？

## 用其它字体代替

一般使用其他字体（如楷体）代替斜体：

```typst
-- #set page(height: auto, margin: 1em)
-- #let 西文字体 = (name: "Libertinus Serif", covers: "latin-in-cjk")
#show emph: text.with(font: (西文字体, "Kaiti"))
孔乙己_上大人_
```

## 另法：强行倾斜

伪斜体也可使用[`skew`函数](https://typst.app/docs/reference/layout/skew/)：
```typst
-- #set page(height: auto, margin: 1em)
#skew(ax: -12deg)[111]111
```
但是针对一大段效果并不好。
```typst
#skew(ax: -12deg)[
  Typst 是可用于出版的可编程标记语言，拥有变量、函数、包管理与错误检查等现代编程语言的特性，同时也提供了闭包等特性，便于进行函数式编程。以及包括了 [标记模式]、{脚本模式} 与 数学模式 等多种模式的作用域，并且它们可以不限深度地、交互地嵌套。并且通过 包管理，你不再需要像 TexLive 一样在本地安装一大堆并不必要的宏包，而是按需自动从云端下载。
]
```

---

另请参考：[如何控制嵌套`emph`和`strong`的样式？](./strong-emph.md)
