---
tags: [math, layout]
---
# 如何避免公式、图表等块元素的下一行缩进？

在段落中加入行间数学公式，总会在后面加入一个新段落，导致出现段落首行缩进。我们希望在创建行间数学公式，且公式后没有空行时，不出现新段落和首行缩进。

用 `#box()` 将行间数学公式包住，且不能有空行。

```typst
#set page(width: 30em, height: auto)
#set par(first-line-indent: (amount: 2em, all: true))
#set math.equation(numbering: "(1.1)")

#lorem(10), for example,
#box[$ integral x + y = z $]
shows that the integral of $x + y$ is $z$.

#lorem(20)
```

对比

```typst
#set page(width: 30em, height: auto)
#set par(first-line-indent: (amount: 2em, all: true))
#set math.equation(numbering: "(1.1)")

#lorem(10), for example,
$ integral x + y = z $
shows that the integral of $x + y$ is $z$.

#lorem(20)
```

对于 tight list 和 figure 来说也是同理。

相关 issue：[Paragraph should be able to contain tight lists and block-level equations · #3206](https://github.com/typst/typst/issues/3206)
