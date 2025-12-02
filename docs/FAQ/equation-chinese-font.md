---
tags: [font, math, equation, text]
outline: [2, 3]
---

# 如何修改公式里的中文字体？

若不专门设置，公式中的中文通常是楷体：

```typst
-- #set page(height: auto, width: auto, margin: 1em)
$ hat(alpha)(f) = f(alpha) "（同上，α–map的“定义”）"$
$ f(alpha) #[或者*任意*内容 _α–map_ $alpha$–map] $
$ cases("Math" 1 I l, "正文 1Il") $
```

<!-- 为测试效果明显，以下都关闭 text.fallback；实用时不建议关闭 -->

## Typst 0.14

[配置正文字体](./install-fonts.md)后，请按以下任一方法继续设置数学公式的字体。

::: details “引号”泛指中西共用标点

下文所谓“引号”并不专指单双引号，而泛指[中西共用标点](https://github.com/w3c/clreq/issues/534)，具体包括：

- Latin-1 Supplement:
  - U+00B7 `·` MIDDLE DOT
- General Punctuation:
  - U+2013 `–` EN DASH
  - U+2014 `—` EM DASH
  - U+2018 `‘` LEFT SINGLE QUOTATION MARK
  - U+2019 `’` RIGHT SINGLE QUOTATION MARK
  - U+201C `“` LEFT DOUBLE QUOTATION MARK
  - U+201D `”` RIGHT DOUBLE QUOTATION MARK
  - U+2025 `‥` TWO DOT LEADER
  - U+2026 `…` HORIZONTAL ELLIPSIS
  - U+2027 `‧` HYPHENATION POINT
- Supplemental Punctuation:
  - U+2E3A `⸺` TWO-EM DASH

参考[Typst 源代码中的 `Covers::LatinInCjk`](https://github.com/typst/typst/blob/17a7890b2dc47da390d194d3593ed9a8b5668169/crates/typst-library/src/text/mod.rs#L891-L898)。

:::

### 若引号想用中文字体（数学、西文字体统一）

```typst
-- #set page(height: auto, width: auto, margin: 1em)
-- #set text(fallback: false)
#show math.equation: set text(font: (
  (name: "New Computer Modern Math", covers: "latin-in-cjk"), // 数学
  (name: "Source Han Serif SC", covers: regex(".")), // 中文
  "New Computer Modern Math", // 数学
))

-- $ hat(alpha)(f) = f(alpha) "（同上，α–map的“定义”）"$
-- $ f(alpha) #[或者*任意*内容 _α–map_ $alpha$–map] $
-- $ cases("Math" 1 I l, "正文 1Il") $
```

::: tip
Typst 0.14 会将首个没有`covers`的字体用作数学基准字体，从中提取间距等数学排版信息。因此，中文字体若在数学字体之前，必须设置`covers: regex(".")`，不然中文字体会被误当做数学基准字体，导致数学间距异常，并让你满篇文章都有警告。
:::

### 若引号想用数学字体（数学、西文字体统一）

```typst
-- #set page(height: auto, width: auto, margin: 1em)
-- #set text(fallback: false)
#show math.equation: set text(font: (
  "New Computer Modern Math", // 数学
  "Source Han Serif SC", // 中文
))

-- $ hat(alpha)(f) = f(alpha) "（同上，α–map的“定义”）"$
-- $ f(alpha) #[或者*任意*内容 _α–map_ $alpha$–map] $
-- $ cases("Math" 1 I l, "正文 1Il") $
```

### 其它方法（数学、西文字体分开）

如果您真的需要，也可以分开设置数学和西文字体。不过请注意以下问题。

1. 数学公式中，文本（`$"x"$`或`$#[x]$`）和正体变量（`$upright(x)$`）使用相同字符，无法分开设置字体。以下几种方法中，它们都会变成西文字体。

   类似地，数字`$1$`和`$"1"$`也无法区分。以下几种方法中，它们仍使用数学字体。

2. 数学公式中有些普通字符需要数学特性。例如`cases`的大括号，就字符而言只是普通的`{`，而排版时需随内容拉伸。西文字体虽然也提供这些字符，但不支持数学，无法使用。

   因此，西文字体的`covers`不能使用`latin-in-cjk`或`regex(".")`，必须换成范围更小的正则表达式。

具体设置方法如下。

::: details 如果引号想用中文字体

```typst
-- #set page(height: auto, width: auto, margin: 1em)
-- #set text(fallback: false)
#show math.equation: set text(font: (
  (name: "Libertinus Serif", covers: regex("[.\d\p{Latin}]")), // 西文
  (name: "Source Han Serif SC", covers: regex("[·–—‘’“”‥…‧⸺]")), // 中文
  "New Computer Modern Math", // 数学
  "Source Han Serif SC", // 中文
))

-- $ hat(alpha)(f) = f(alpha) "（同上，α–map的“定义”）"$
-- $ f(alpha) #[或者*任意*内容 _α–map_ $alpha$–map] $
-- $ cases("Math" 1 I l, "正文 1Il") $
```

:::

::: details 如果引号想用西文字体

```typst
-- #set page(height: auto, width: auto, margin: 1em)
-- #set text(fallback: false)
#show math.equation: set text(font: (
  (name: "Libertinus Serif", covers: regex("[.\d\p{Latin}·–—‘’“”‥…‧⸺]")), // 西文
  "New Computer Modern Math", // 数学
  "Source Han Serif SC", // 中文
))

-- $ hat(alpha)(f) = f(alpha) "（同上，α–map的“定义”）"$
-- $ f(alpha) #[或者*任意*内容 _α–map_ $alpha$–map] $
-- $ cases("Math" 1 I l, "正文 1Il") $
```

:::

::: details 如果引号想用数学字体

```typst
-- #set page(height: auto, width: auto, margin: 1em)
-- #set text(fallback: false)
#show math.equation: set text(font: (
  (name: "Libertinus Serif", covers: regex("[.\d\p{Latin}]")), // 西文
  "New Computer Modern Math", // 数学
  "Source Han Serif SC", // 中文
))

-- $ hat(alpha)(f) = f(alpha) "（同上，α–map的“定义”）"$
-- $ f(alpha) #[或者*任意*内容 _α–map_ $alpha$–map] $
-- $ cases("Math" 1 I l, "正文 1Il") $
```

:::

## Typst 0.13

[#5305](https://github.com/typst/typst/pull/5305) 目前可以对不同字符分别设置不同的字体。

[配置正文字体](./install-fonts.md)后，请继续设置数学公式的字体：

```typst v0.13.1
-- #set page(height: auto, width: auto, margin: 1em)
-- #set text(fallback: false)
#show math.equation: set text(font: (
  (name: "Libertinus Serif", covers: "latin-in-cjk"), // 西文
  "Source Han Serif SC", // 中文
  "New Computer Modern Math", // 数学
))

-- $ hat(alpha)(f) = f(alpha) "（同上，α–map的“定义”）"$
-- $ f(alpha) #[或者*任意*内容 _α–map_ $alpha$–map] $
-- $ cases("Math" 1 I l, "正文 1Il") $
```

1. **西文**字体，负责 `123`、`abc`、`,"!、{}()` 等

   Libertinus Serif 是 typst 内置的字体，可换为其它西文字体。

   注意此处不建议设为 New Computer Modern，不然会导致大括号无法伸缩等问题。

2. **中文**字体，负责汉字和`，“”！`等

   Source Han Serif SC 可换为其它中文字体。

3. **数学**字体，负责公式中的复杂排版

   New Computer Modern Math 是 typst 内置的字体，可换为其它支持 OpenType 数学特性的字体。

::: details 若计划中西共用同一字体

可合并前两项，例如：

```typst v0.13.1
-- #set page(height: auto, width: auto, margin: 1em)
-- #set text(fallback: false)
#show math.equation: set text(font: (
  "Source Han Serif SC",
  "New Computer Modern Math",
))

-- $ hat(alpha)(f) = f(alpha) "（同上，α–map的“定义”）"$
-- $ f(alpha) #[或者*任意*内容 _α–map_ $alpha$–map] $
-- $ cases("Math" 1 I l, "正文 1Il") $
```

注意这里第一处`_α–map_`没有倾斜，因为 Source Han Serif SC 缺少相应字形。

:::

此外，**不建议**设置 `#show math.equation: set text(fallback: false)`。

## Typst 0.12

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
-- $ cases("Math" 1 I l, "正文 1Il") $
```

这种方法不会设置`（）`等中文独占标点的字体（它们仍然随机回落），而且在使用后难以覆盖，请谨慎使用。
