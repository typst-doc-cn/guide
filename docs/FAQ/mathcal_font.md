---
tags: [math, font]
---

# 怎么把 cal 字体变成 LaTeX 里 mathcal 默认的那种？

Typst 中数学字体默认是 New Computer Modern Math，与 LaTeX 中默认[^unicode-math]的 Computer Modern Math 略有不同。

[^unicode-math]: 此处指不使用 unicode-math 时的默认数学字体；若使用 unicode-math，默认字体是 New Computer Modern Math，Typst 效果与之相同。

若想使用 LaTeX 默认的`\mathcal`花体，需要更换字体。

1. 从 matplotlib 的`mpl-data/fonts/ttf/`文件夹[下载`cmsy10.ttf`](https://github.com/matplotlib/matplotlib/blob/be68dfecf9d26ac1a8e1e30a0de6171ecf174cd5/lib/matplotlib/mpl-data/fonts/ttf/cmsy10.ttf)
2. 设置`font: "cmsy10"`

```typst no-render
$ cal(K M Z) $
#let cal(s) = text(s, font: "cmsy10")
$ cal(K M Z) $
```

![image](https://github.com/user-attachments/assets/481908d4-6163-425b-9296-617eef98338f)

::: details 为何出现 matplotlib？

Computer Modern Math 早于 OpenType 技术标准，通常以 Type 1 字体形式存在，如`cmsy10.pfm`。

今天很多软件都不支持`*.pfm`。matplotlib 开发者将它转换成了`cmsy10.ttf`，可供 Typst 等软件使用。

:::


另外，LaTeX 中有 calligraphic 和 script 两种花体，后者请参考[如何实现`\mathscr`的花体符号](./symbol-mathscr.md)。
