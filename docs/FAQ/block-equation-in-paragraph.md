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

## 实用解决办法——遍历全文，抵消缩进

```typst
-- #set page(height: auto, width: 12em, margin: 1em)
#set par(first-line-indent: (all: true, amount: 2em))

// 以下规则必须放在最后
#show: rest => {
  let immediately-after = false

  for it in rest.children {
    if immediately-after and it.func() == text {
      context h(-par.first-line-indent.amount)
    }
    it

    if it != [ ] {
      immediately-after = false
    }

    if (
      (it.func() == math.equation and it.block)
        or it.func() == list.item
        or it.func() == enum.item
    ) {
      immediately-after = true
    }
  }
}


应用以上规则后，公式后若不空行，例如
$ x $
则后文首行不缩进。

若空行，例如这样
$ y $

则后文另起一段，首行缩进。
```

::: details 原理

（为简单，这里仅以公式和换行为例；以上代码也适用于列表、空格等情况。）

**现象：**如果源代码在公式后连换两行（即空一行），则在 Typst 中公式后的元素为`parbreak`；若只换一行（即不空行），则为`space`；若只换一行且加了标签（例：`前一行 $ x $ <eq> 后一行`），则出现连续两个`space`。

**思路：**设计 show 规则，匹配“公式，零个或任意多个`space`，文本”序列，抵消序列中文本的首行缩进。

**具体操作：**

- 匹配到序列后，保留公式，在文本前加`h(-par.first-line-indent.amount)`。
- 不匹配时，原样显示。

**效果：** show 规则会让文章发生以下变化。

```typst no-render
#sequence(
  parbreak(),
  [应用以上规则后，公式后若不空行，例如],
  [ ],
  equation(block: true, body: [x]),
  [ ],
  context h(-2em), // [!code ++]
  [则后文首行不缩进。],
  parbreak(),
  [若空行，例如这样],
  [ ],
  equation(block: true, body: [y]),
  parbreak(),
  [则后文另起一段，首行缩进。],
  [ ],
)
```

:::

来源：[physy 在 #3206 的评论](https://github.com/typst/typst/issues/3206#issuecomment-3013274959)。

这种方法有以下若干小问题，不过也基本够用了。

- 如果后文以`*strong*`、`_emph_`等开头，那么方法失效，仍会错误缩进。（可用`#h(-2em)`等方式手动解决）
- 仅仅抵消了缩进，并未改变分段情况，语义仍不正确。
- 公式上下仍然是段间距`par.spacing`，会比行间距`par.leading`大。
- 不支持在文章半途切换`par.first-line-indent`。

## 语义正确的解决办法——套 box

这种方法用起来很繁琐，且不支持公式跨页，但它不存在前法的四个问题。

下面以公式为例，但方法其实也适用于 tight list 和 figure 等。

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
