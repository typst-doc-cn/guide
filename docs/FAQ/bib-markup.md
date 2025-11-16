---
tags: bib
---

# 参考文献 title 里如何加上下标等样式？

目前没有内置支持，因为没设计好接口。（[#1975](https://github.com/typst/typst/issues/1975)）

## 法一：自己定义标记，`show regex`

```typst {2,14}
-- #set page(width: auto, height: auto, margin: 1em)
-- #set text(lang: "zh")
#show bibliography: body => {
  show regex(`\[\[.+\]\]`.text): it => {
    show "[[": none
    show "]]": none
    super(it)
  }
  body
}

#bibliography(
  bytes(
    ```bib
    @article{key,
      title = {午夜[[上标]]},
    }
    ```.text,
  ),
  style: "gb-7714-2015-numeric",
  full: true,
)
```

## 法二：滥用数学环境

根据 [hayagriva 文档](https://github.com/typst/hayagriva/blob/main/docs/file-format.md#formattable-string)，参考文献支持用`$…$`插入数学模式的 Typst 代码。而[数学、代码、标记模式](https://typst.app/docs/reference/syntax/#modes)可以相互切换，实现任意样式。

不过数学环境默认会设置字体为 New Computer Modern Math，我们需要覆盖它。覆盖设置字体时，还必须加上[`covers`](https://typst.app/docs/reference/text/text/#parameters-font)，不然Typst 会试图从首个无`covers`的字体提取数学排版数据，并警告字体没有这些数据。

```typst {10}
-- #set page(width: auto, height: auto, margin: 1em)
-- #set text(lang: "zh")
#show bibliography: body => {
  show math.equation: set text(font: (name: "SimSun", covers: regex(".")))
  body
}

#bibliography(
  bytes(
    ```bib
    @article{key,
      title = {午夜$#super[上标]$},
    }
    ```.text,
  ),
  style: "gb-7714-2015-numeric",
  full: true,
)
```