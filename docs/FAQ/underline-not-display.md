---
tags: [text]
---
# 为什么下划线不显示？

标记模式下写多个空格是没用的，会被合并成一个空格，如下图

```typst
-- #set page(height: auto, width: auto, margin: 1em)
- 空空 #underline[     ] 如也
- 空空#underline[     ]如也
```

## 若坚持用 `underline`

请换用字符串占位。

```typst
-- #set page(height: auto, width: auto, margin: 1em)
- 空空#underline("     ")如也
- 空空#underline(" " * 5)如也 // 效果同上
// 也可用汉字空格 U+3000 IDEOGRAPHIC SPACE 占位
- 空空#underline("\u{3000}" * 2)如也
```

## 换用 `box`

也可换用[`box`](https://typst.app/docs/reference/layout/box/#parameters-baseline)，直接指定长度：

```typst
-- #set page(height: auto, width: auto, margin: 1em)
空空#box(width: 2em, stroke: (bottom: 0.5pt))如也
```

若之前用 `underline(offset: …)` 调整了下划线位置，现在可用 `box(outset: …)` 替代：

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#let uline(width) = box(width: width, stroke: (bottom: 0.5pt), outset: (bottom: 2pt))
空空#uline(2em)如也
```

用 `box` 的优点是方便填入内容，例如

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#let uline(width, body) = box(align(center, body), width: width, stroke: (bottom: 0.5pt), outset: (bottom: 2pt))
日期：#uline(3em)[2025]年#uline(1em)[6]月
```

::: details 番外

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#let uline(width) = box(width: width, stroke: (bottom: 0.5pt))
#for n in range(20) [
  - 空空#uline(1em + 10pt * calc.sin(n / 10 * calc.pi))如也
]
```

:::
