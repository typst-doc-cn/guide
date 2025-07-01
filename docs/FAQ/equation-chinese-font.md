---
tags: [font, math, equation, text]
---

# 如何修改公式里的中文字体？

若不专门设置，公式中的中文通常是楷体：

```typst
-- #set page(height: auto, width: auto, margin: 1em)
$ hat(alpha)(f) = f(alpha) "（同上，α–map的“定义”）"$
$ f(alpha) #[或者*任意*内容 _α–map_ $alpha$–map] $
$ "Math" 1 I l "vs. 正文 1Il" $
```

:::: tip ✅ Typst 0.13 已改进

[#5305](https://github.com/typst/typst/pull/5305) 目前可以对不同字符分别设置不同的字体。

[配置正文字体](./install-fonts.md)后，请继续设置数学公式的字体：

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#show math.equation: set text(font: (
  (name: "Libertinus Serif", covers: "latin-in-cjk"), // 西文
  "Source Han Serif SC", // 中文
  "New Computer Modern Math", // 数学
))

-- $ hat(alpha)(f) = f(alpha) "（同上，α–map的“定义”）"$
-- $ f(alpha) #[或者*任意*内容 _α–map_ $alpha$–map] $
-- $ "Math" 1 I l "vs. 正文 1Il" $
```

1. **西文**字体，负责 `123`、`abc`、`,"!、{}()` 等

   Libertinus Serif 是 typst 内置的字体，可换为其它西文字体。

2. **中文**字体，负责汉字和`，“”！`等

   Source Han Serif SC 可换为其它中文字体。

3. **数学**字体，负责公式中的复杂排版

   New Computer Modern Math 是 typst 内置的字体，可换为其它支持 OpenType 数学特性的字体。

::: details 若计划中西共用同一字体

可合并前两项，例如：

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#show math.equation: set text(font: (
  "Source Han Serif SC",
  "New Computer Modern Math",
))

-- $ hat(alpha)(f) = f(alpha) "（同上，α–map的“定义”）"$
-- $ f(alpha) #[或者*任意*内容 _α–map_ $alpha$–map] $
-- $ "Math" 1 I l "vs. 正文 1Il" $
```

注意这里第一处`_α–map_`没有倾斜，因为 Source Han Serif SC 缺少相应字形。

:::

此外，**不建议**设置 `#show math.equation: set text(fallback: false)`。

::::

如果你使用旧版本，请使用以下旧方案。

使用 `regex("\p{script=Han}")` 匹配中文。

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#show math.equation: it => {
  show regex("\p{script=Han}"): set text(font: "Source Han Serif SC")
  it
}
-- $ hat(alpha)(f) = f(alpha) "（同上，α–map的“定义”）"$
-- $ f(alpha) #[或者*任意*内容 _α–map_ $alpha$–map] $
-- $ "Math" 1 I l "vs. 正文 1Il" $
```
