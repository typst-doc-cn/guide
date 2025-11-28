# 一些未整理的例子

## 下划线 {#underline}

```typst
#set page(height: 9cm, width: 16cm)

#set par(leading: 1em)
#let uline(answer: false, body) = context {
  let show_all_answer = false
  show_all_answer = true

  let y = 1em / 5
  let l = measure(body).width + 3pt
  if body.has("block") { // 内容是否是公式
    if body.fields().block { // 行间公式
      set align(center)
      block(outset: (bottom:0.1em), stroke: (bottom: 0.6pt))[#body]
      return
    } else { // 行内公式
      y = 1em / 2
    }
  }
  box(place(dy: y, dx: 2pt, line(length: l, stroke: .6pt)))
  if show_all_answer {
    [ ] + body + [ ]
  } else {
    [ ] + if answer { body } else { hide(body) } + [ ]
  }
}
+ 计算 #uline()[$x+y$]
+ 第一布里渊区的范围是：#uline(answer: true, $-pi / a < k < pi / a$)
+ 白日依山尽，#uline()[黄河入海流]

#text(20pt, red, stroke: 1pt + red)[问题：]
+ 如果传入的公式是行间公式，不清楚如何放置下划线\
  #uline()[$ f(x)dif x $]
+ 不清楚如何针对公式的宽度自适应下划线的位置\
  对于 $upright(p^+n)$ 结，其扩散电容的表达式为：#uline(answer: true)[$ C_D = (frac(A q^2 p_(n_0)L_p, k_o T)) exp(frac(q V , k_o T))$]
```
