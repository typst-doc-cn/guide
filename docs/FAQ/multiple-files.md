---
tags: [structure]
---
# 如何按章节拆分文件编写？

群友反馈文件一大，preview 和浏览器都很卡。那么如何拆文件呢？

直接把内容拆分放到多个文件里即可，然后在主文件里使用 `#include "chapter1.typ"` 引入。

可能存在的问题是，label 所在的文件被注释掉之后，Typst 编译器会因为找不到引用对应的标签而报错，可以使用下面的代码修复。

```typst
#show ref: it => {
  if query(it.target).len() == 0 {
    return text(fill: red, "<未找到引用" + str(it.target) + ">")
  }
  it
}

// 注释掉前面已经定稿的部分
// #include "chapter1.typ"
// #include "chapter2.typ"

// 假设下面的部分正在编写
#figure(rect(), caption: "A sample figure") <fig2>
@fig1 @fig2
```
