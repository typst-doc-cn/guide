---
tags: [font, chinese, text]
links:
  - https://github.com/typst/typst/issues/794
---

# 中英文如何使用不同的字体？

::: tip ✅ Typst 0.13 已改进
[#5305](https://github.com/typst/typst/pull/5305) 增加了[`covers`选项](https://typst.app/docs/reference/text/text/#parameters-font)。例如西文用 Times New Roman，中文用 SimSun（中易宋体），请这样设置：

```typst
-- #set page(width: 18em, height: auto, margin: 1em)
#set text(font: (
  (name: "Times New Roman", covers: "latin-in-cjk"),
  "SimSun"
))
分别设置“中文”和English字体
```

其中`covers: "latin-in-cjk"`的作用在于禁止中西共用标点（引号`“”`、破折号`——`等）使用 Times，从而让这些标点使用第二项 SimSun；若删除`covers: "latin-in-cjk"`，由于 Times 位列第一且有相应字形，中西共用标点会错误地使用西文字体，导致其宽度不符合中文习惯，参考以下旧方案的效果。

如果中西引号需要同时使用，可进一步[使用智能引号](./smartquote-font.md)。
:::

如果你使用旧版本，请使用以下旧方案。

设置字体可以使用一个列表，Typst 会按照列表中的顺序依次尝试使用字体。因此只需把英文字体放在中文字体前面即可。例如：

```typst
-- #set page(width: 18em, height: auto, margin: 1em)
#set text(font: ("Times New Roman", "SimSun"))
分别设置“中文”和English字体
```

当然，这种方式严格来说并不是“中英文使用不同的字体”，但是 99% 的情况下已经够用了。

::: details 如果你是剩下的 1%
如果你发现了中文引号等标点不对劲，那么你可以用这个修复 `#show regex("[“‘’”]|——|……"): set text(font: "SimSun")`。

如果你还需要对中文字体进行特殊处理，例如只缩小中文字体的大小，请参考[如何协调中西字体的字号](./lang-font-size.md)。
:::
