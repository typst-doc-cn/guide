---
tags: [equation, font]
---

# 怎么把 cal 字体变成 LaTeX 里 mathcal 默认的那种？

## 标准办法

```typst
-- #set page(height: auto)
#let scr(it) = text(
  features: ("ss01",),
  box($cal(it)$),
)

We establish $cal(P) != scr(P)$.
```

来源：[`cal` - Variants Functions – Typst Documentation](https://typst.app/docs/reference/math/variants#functions-cal)。

## 另法

字体不一样，换个字体即可。LaTeX 用的是 Computer Modern Math，mathcal 字体所在的字体文件名字通常是 `cmsy10.pfm`，你可以手动把它转换成 ttf 格式，但是没必要。

另一种获得这个字体的方法是，如果你电脑上安装了 python 的 matplotlib 包，那么你可以在 `Lib/site-packages/matplotlib/mpl-data/fonts/ttf` 目录中找到 `cmsy10.ttf`，使用这个文件即可。

```typst no-render
$ cal(K M Z) $
#let cal(s) = text(s, font: "cmsy10")
$ cal(K M Z) $
```

![image](https://github.com/user-attachments/assets/481908d4-6163-425b-9296-617eef98338f)
