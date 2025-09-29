---
tags: [layout, bug, list]
outline: [2, 3]
---

# 列表符号/编号和内容错位怎么办？

## 现象

### 分别设置中西文字体，导致符号/编号与内容错位

若分别设置了中西字体，那么即使只写汉字，`enum` 或 `list` 的符号/编号和内容也可能错位，例如下图：

```typst
-- #set page(height: auto)
#set text(font: ((name: "New Computer Modern", covers: "latin-in-cjk"), "SimSun"))

= `enum`
+ 鲁镇的酒店的格局

= `list`
- 鲁镇的酒店的格局
```

并且直接写编号完全正常：

```typst
-- #set page(height: auto)
-- #set text(font: ((name: "New Computer Modern", covers: "latin-in-cjk"), "SimSun"))
#[1.] 鲁镇的酒店的格局
```

::: info 已知存在问题的字体组合

- 西文：New Computer Modern / Libertinus Serif
- 中文：中易宋体/方正书宋/方正新书宋

:::

### 复杂内容块或行内公式，导致符号/编号与内容错位

如果行内有额外高度的 `box` 或者行内公式，会撑高内容块的高度，导致符号/编号与内容错位，例如下图：

```typst
-- #set page(height: auto)
= `enum`
+ abc $display(integral)_a^b$
+ def #box(stroke: 1pt, inset: 3mm, baseline: 3mm)[test]

= `list`
- abc $display(integral)_a^b$
- def #box(stroke: 1pt, inset: 3mm, baseline: 3mm)[test]
```

## 解决方法

### 推荐方法：使用 `itemize` 包

`itemize` 包可以解决大多数符号/编号与内容错位的问题

```typst
-- #set page(height: auto)
#import "@preview/itemize:0.1.2" as el
#show: el.default-enum-list

#set text(font: ((name: "New Computer Modern", covers: "latin-in-cjk"), "SimSun"))

= `enum`
+ 鲁镇的酒店的格局

= `list`
- 鲁镇的酒店的格局
```

```typst
-- #set page(height: auto)
#import "@preview/itemize:0.1.2" as el
#show: el.default-enum-list

= `enum`
+ abc $display(integral)_a^b$
+ def #box(stroke: 1pt, inset: 3mm, baseline: 3mm)[test]

= `list`
- abc $display(integral)_a^b$
- def #box(stroke: 1pt, inset: 3mm, baseline: 3mm)[test]
```

具体可参考其 [Typst Universe 页面](https://typst.app/universe/package/itemize)

### 其它方法

以下是早期文档中提及的其它方法，这里保留并折叠，可供额外参考：

<details>
<summary>点击展开</summary>

#### 法一：数字也用中文字体

```typst {1}
-- #set page(height: auto)
#set text(font: "SimSun")
+ 鲁镇的酒店的格局
```

#### 法二：修改编号对齐方式

```typst
-- #set page(height: auto)
#set text(font: ((name: "New Computer Modern", covers: "latin-in-cjk"), "SimSun"))

= `enum`
#set enum(number-align: bottom) // [!code ++]
+ 鲁镇的酒店的格局

= `list`
#set list(marker: ([•], [‣], [–]).map(align.with(horizon)))  // [!code ++]
- 鲁镇的酒店的格局
```

#### 法三：修改汉字边框计算方式

```typst
-- #set page(height: auto)
#set text(font: ((name: "New Computer Modern", covers: "latin-in-cjk"), "SimSun"))

#set text(top-edge: "ascender", bottom-edge: "descender") // [!code ++]

= `enum`
+ 鲁镇的酒店的格局

= `list`
- 鲁镇的酒店的格局
```

不过这样会在视觉上增大行距，详见[文字外框的解释](./par-leading.md)。

#### 如果列表内容复杂

来自 [@OrangeX4](https://github.com/OrangeX4) 的解决方案

```typst
-- #set page(height: auto)
/// Align the list marker with the baseline of the first line of the list item.
///
/// Usage: `#show: align-list-marker-with-baseline`
#let align-list-marker-with-baseline(body) = {
  show list.item: it => context {
    let current-marker = {
      set text(fill: text.fill)
      if type(list.marker) == array {
        list.marker.at(0)
      } else {
        list.marker
      }
    }
    let hanging-indent = measure(current-marker).width + .6em + .3pt
    set terms(hanging-indent: hanging-indent)
    if type(list.marker) == array {
      terms.item(
        current-marker,
        {
          // set the value of list.marker in a loop
          set list(marker: list.marker.slice(1) + (list.marker.at(0),))
          it.body
        },
      )
    } else {
      terms.item(current-marker, it.body)
    }
  }
  body
}

/// Align the enum marker with the baseline of the first line of the enum item. It will only work when the enum item has a number like `1.`.
///
/// Usage: `#show: align-enum-marker-with-baseline`
#let align-enum-marker-with-baseline(body) = {
  show enum.item: it => context {
    if not it.has("number") or it.number == none or enum.full == true {
      // If the enum item does not have a number, or the number is none, or the enum is full
      return it
    }
    let weight-map = (
      thin: 100,
      extralight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    )
    let current-marker = {
      set text(
        fill: text.fill,
        weight: if type(text.weight) == int {
          text.weight - 300
        } else {
          weight-map.at(text.weight) - 300
        },
      )
      numbering(enum.numbering, it.number) + h(-.1em)
    }
    let hanging-indent = measure(current-marker).width + .6em + .3pt
    set terms(hanging-indent: hanging-indent)
    terms.item(current-marker, it.body)
  }
  body
}

#show: align-list-marker-with-baseline
#show: align-enum-marker-with-baseline

- 1 + $display(integral) + x$
- 1 + $display(integral)$

1. 1 + $display(integral) + x$
2. 1 + $display(integral)$
```

</details>

相关 issue：[List and enum markers are not aligned with the baseline of the item's contents · Issue #1204 · typst/typst](https://github.com/typst/typst/issues/1204)
