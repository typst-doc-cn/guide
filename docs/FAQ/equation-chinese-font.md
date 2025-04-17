---
tags: [font, math, equation, text]
---

# 如何修改公式里的中文字体？

::: tip ✅ Typst 0.13 已改进
[#5305](https://github.com/typst/typst/pull/5305) 目前可以对不同字符分别设置不同的字体。

配置正文字体后，请继续设置数学公式的字体：

```typst no-render
#show math.equation : set text(font: (
  (name: "Noto Sans CJK SC", covers: regex("\p{script=Han}")),
  "New Computer Modern Math",
))

$ f(x) #[原神] $
```

- 「New Computer Modern Math」是数学字体，负责 `123`、`abc`、`,"!、{}()` 等
- 「Noto Sans CJK SC」是 CJK 字体，负责汉字和`，“”！`等

此外，请**不要**设置 `#show math.equation: set text(fallback: false)`。
:::

如果你使用旧版本，请使用以下旧方案。

使用 `regex("\p{script=Han}")` 匹配中文。

```typst
-- #set page(height: auto, margin: 1em)
#show math.equation: it => {
  show regex("\p{script=Han}"): set text(font: "Source Han Serif SC")
  it
}
$ f(x) #[原神] $
```
