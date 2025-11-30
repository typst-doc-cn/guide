---
tags: [math, layout]
outline: [2, 3]
---

# 如何避免公式、图表等块元素的下一行缩进？

## 问题

在段落中加入行间数学公式，总会在后面加入一个新段落，导致出现段落首行缩进。

```typst
-- #set page(width: 30em, height: auto)
-- #set par(first-line-indent: (amount: 2em, all: true))
-- #set math.equation(numbering: "(1.1)")
#lorem(10), for example,
$ integral x + y = z $ // [!code highlight]
shows that the integral of $x + y$ is $z$.
```

我们希望在创建行间数学公式，且公式后没有空行时，不出现新段落和首行缩进。

## 解决办法

以下以公式为例，但方法也适用于 tight list 和 figure。

### 基础情况

用 `#box()` 将行间数学公式包住，且不能有空行。

```typst
-- #set page(width: 30em, height: auto)
#set par(first-line-indent: (amount: 2em, all: true))
-- #set math.equation(numbering: "(1.1)")

#lorem(10), for example,
#box[$ integral x + y = z $] // [!code ++]
shows that the integral of $x + y$ is $z$.

#lorem(20)
```

### 若启用两端对齐

如果你启用了`justify`两端对齐，那么还需在`box`之前[人为换行](https://typst.app/docs/reference/text/linebreak/)，以取消`box`前一行的调整。

```typst
-- #set page(width: 30em, height: auto)
#set par(justify: true, first-line-indent: (amount: 2em, all: true))
-- #set math.equation(numbering: "(1.1)")

= Bad

#lorem(10), for example, // [!code --]
#box[$ integral x + y = z $]
shows that the integral of $x + y$ is $z$.

= Good

#lorem(10), for example, \ // [!code ++]
#box[$ integral x + y = z $]
shows that the integral of $x + y$ is $z$.
```

### 若公式无编号

若公式无编号，那么还需用`width: 100%`指定`box`占满宽度。

```typst
-- #set page(width: 30em, height: auto)
#set par(first-line-indent: (amount: 2em, all: true))

= Bad

#lorem(10), for example,
#box[$ integral x + y = z $] // [!code --]
shows that the integral of $x + y$ is $z$.

= Good

#lorem(10), for example,
#box(width: 100%)[$ integral x + y = z $] // [!code ++]
shows that the integral of $x + y$ is $z$.
```
