---
tags: [math, font]
outline: [2, 3]
---

# 怎么把 cal 字体变成 LaTeX 里 mathcal 默认的那种？

Typst 中数学字体默认是 New Computer Modern Math，与 LaTeX 中默认[^unicode-math]的 Computer Modern Math 略有不同。

[^unicode-math]: 此处指不使用 unicode-math 时的默认数学字体；若使用 unicode-math，默认字体是 New Computer Modern Math，Typst 效果与之相同。

若想使用 LaTeX 默认的`\mathcal`花体，需要更换字体，并用`upright`切换到普通码位。

1. 从 matplotlib 的`mpl-data/fonts/ttf/`文件夹[下载`cmsy10.ttf`](https://github.com/matplotlib/matplotlib/blob/be68dfecf9d26ac1a8e1e30a0de6171ecf174cd5/lib/matplotlib/mpl-data/fonts/ttf/cmsy10.ttf)
2. 设置`font: "cmsy10"`

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#let cal(s) = text(font: "cmsy10", math.upright(s))
$ cal(K M Z) != std.math.cal(K M Z) $
```

::: details 为何出现 matplotlib？

Computer Modern Math 早于 OpenType 技术标准，通常以 Type 1 字体形式存在，如`cmsy10.pfm`。

今天很多软件都不支持`*.pfm`。matplotlib 开发者将它转换成了`cmsy10.ttf`，可供 Typst 等软件使用。

:::

另外，LaTeX 中有 calligraphic 和 script 两种花体，后者请参考[如何实现`\mathscr`的花体符号](./symbol-mathscr.md)。

## 已知问题

### 上下标位置不对

该方法会导致上下标的位置异常。其中，竖直位置有玄学办法勉强修补（加上`context`），而水平位置则无已知办法能完全解决；如果您介意，最好还是用 Typst 默认的`cal`。

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#set align(end)

正常效果 $cal(P)_n, cal(T)^p$

#let cal(s) = text(font: "cmsy10", math.upright(s))
异常效果 $cal(P)_n, cal(T)^p$

#let cal(s) = context text(font: "cmsy10", math.upright(s))
勉强修补后 $cal(P)_n, cal(T)^p$
```

此外，[以下修改版字体`CMSY10_fix.otf`](#码位不是数学字符)能改正竖直位置并略微改进水平位置。理论上继续修改还能改正水平位置，但尚无人操作过。

更全面的测试请参考 [How to use (old) Computer Modern for `math.cal`? And why context matters? - Questions - Typst Forum](https://forum.typst.app/t/how-to-use-old-computer-modern-for-math-cal-and-why-context-matters/6806)。


### 码位不是数学字符

该方法中，大写字母复制出来是`KMZ`（ASCII）而非`𝒦︀ℳ︀𝒵`（Unicode 数学字符），而其余字符更是连显示也不对。这是因为原版`cmsy10.ttf`设置的码位不符合今日习惯，如对比表格所示。

::: details 对比表格

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#let examples = (
  [ABC],
  $cal(A B C)$,
  [abc],
  [012],
  $cal(T) x - 2 y >> cal(A)$,
  "!#%()",
  $-> => arrow.r.quad arrow.tr arrow.b$,
  "~£¥§μ¶",
  [ÀÁÂÃÄÅ],
)

#set table(stroke: none, align: center + horizon)
#table(
  columns: 3,
  table.header[*New Computer \ Modern*][`cmsy10.ttf`][`CMSY10_fix.otf`],
  table.hline(), table.vline(x: 1), table.vline(x: 2),
  ..examples
    .map(it => ("New Computer Modern Math", "cmsy10", "Computer Modern Symbol").map(font => {
      set text(font: font, fallback: false)
      show math.equation: set text(font: font)
      it
    }))
    .flatten(),
)
```

:::

如果你介意这一点，可自行修复`cmsy10.ttf`的映射或[下载“请输入密码”修改好的`CMSY10_fix.otf`](https://github.com/typst-doc-cn/guide/releases/download/files/CMSY10_fix.otf)，然后如下设置`covers`。

```typst {4-7}
-- #set page(height: auto, width: auto, margin: 1em)
修改前 $cal(K M Z), cal(P)_n, cal(T)^p$

#show math.equation: set text(
  font: (
    (name: "Computer Modern Symbol", covers: regex("[𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩-𝒬ℛ𝒮-𝒵]")),
    "New Computer Modern Math",
  ),
  weight: 450,
  stylistic-set: 1,
  fallback: false,
)
修改后 $cal(K M Z), cal(P)_n, cal(T)^p$
```
