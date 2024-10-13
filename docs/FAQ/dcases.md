---
title: 如何让 cases 里面的分数/公式显示成 display 形式？
tags: [math]
---

```typst
#set page(height: auto)
#import "@preview/physica:0.9.3": *
#let dcases(..args) = math.cases(..args.pos().map(math.display))
$
dcases(nabla dot vb(D) &= 4 pi rho_"f ",
nabla dot vb(B) &= 0,
nabla times vb(E) &= -  1/c pdv(,t) vb(B),
nabla times vb(H) &= (4pi)/c vb(J)_"f " +1/c pdv(,t) vb(D))
$
其中 $rho_"f ",vb(J)_"f "$ 指自由电荷密度和自由电流密度，$vb(E),vb(B),vb(D),vb(H)$ 分别指电场强度、磁感应强度、极化位移矢量和磁场强度。
```
