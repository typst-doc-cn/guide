---
tags: [text]
---

# 行距 leading 是什么距离？文字外框的计算方式？

## 一般模型

行高 = 行距 + 文字尺寸。

下图中，蓝色条形是文字外框，每一条形代表一行：

- 行高（line height）：从一个条形平移到下一条形的距离
- 行距（line gap, leading）：条形间缝隙的高度
- 文字尺寸：条形本身的高度

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#set box(fill: aqua.lighten(20%))
#box[Typst 国王] \
#box[Typst 国王]
```

## Typst 设置

- [`#set par(leading: …)`](https://typst.app/docs/reference/model/par/#parameters-leading)设置行距。
- [`#set text(top-edge: …, bottom-edge: …)`](https://typst.app/docs/reference/text/text/#parameters-top-edge)控制文字外框的计算方式。

默认情况下，文字外框按西文习惯，从大写字母顶端到基线。体现在下图中，就是紧贴着字母 T。

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#set box(fill: aqua)
#box[Typst 国王] \
#box[Typst 国王]
```

而按中文习惯，[字面上下与文字外框的顶线、底线间留有空白](https://www.w3.org/TR/clreq/#h_baselines)。尽管不同设计中空白的大小有所不同，但文字外框都不会像上面这样紧紧卡着汉字。

将 top-edge、bottom-edge 设置为西文的升部、降部，比较接近中文习惯。

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#set box(fill: aqua)
#set text(top-edge: "ascender", bottom-edge: "descender") // [!code ++]
#box[Typst 国王] \
#box[Typst 国王]
```

<!--
  `#set text(top-edge: "bounds", bottom-edge: "bounds")`这样设置成字形边界也差不多；
  不过西文的下边界比中文低导致混排时上下不对称，而且 bounds 与具体文字内容有关导致行高不稳定。
-->
