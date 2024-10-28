---
tags: [math,numbering]
---
# 如何让自定义数学公式编号？

更详细问题的描述：如何使得数学公式默认不编号，并且不记入编号公式的计数，同时可以添加某些命令使得公式编号？

1. 通过`i-figured`包, 建议查看后手搓一个

```typst
#import "@preview/i-figured:0.2.4"
#show math.equation: i-figured.show-equation.with(only-labeled: true)
#set heading(numbering: "1.1")
= Equation numbering
#show math.equation: i-figured.show-equation.with(only-labeled: true)
#lorem(10)
$
a+b=c
$<1>
Try to cite @eqt:1, #lorem(5)
$
1+2=3
$
#lorem(10)
$
4+5 =9
$<2>
#lorem(10)
```

2. 手搓 by OrangeX4, [原文地址](https://forum.typst.app/t/how-to-conditionally-enable-equation-numbering-for-labeled-equations/977/13)

```typst
= Equation numbering
#set math.equation(numbering: "(1)")
#show math.equation: it => {
 if not it.has("label") {
   let fields = it.fields()
   fields.remove("body")
   fields.numbering = none
   return [#counter(math.equation).update(v => v - 1)#math.equation(..fields, it.body)<math-equation-without-label>]
 }
 return it
}

$ x + y $<1>

$ x + y + z $ 

$ x + y $<2>

Cite @1. #lorem(10) 
```

3. 如果你还需要子公式, by obj.fake_cirno

```typst
#set heading(numbering: "1.")
#let ct=counter("eq")
#set math.equation(numbering: it=>ct.display("(1-1.a)"))
#show heading.where(level: 1): it=>it+ct.step()+ct.step(level: 2)
#show math.equation: it=>{ 
  it
  if it.numbering !=none{
    if ct.get().len()==2{
      ct.step(level: 2)
    }
  }
}
#let eq_nonum(body)={
  set math.equation(numbering: none)
  body
}
#let subeqs(..args)={
  for eq in args.pos(){
    ct.step(level: 3)
    eq
  }
  ct.step(level: 2)
}
= Equation numbering
$
f(x) = sin x
$

#lorem(10)
#eq_nonum(
  $ x + y = z $
)
#lorem(10)
$
g(x) = cos x
$
#lorem(10)
#subeqs(
  $ F &= sum  $,     // 编号为 (1-1.a)
  $  =  x $,     // 编号为 (1-1.b)
  $ = 1/2m v^2 $, // 编号为 (1-1.c)
)

```

4. 子公式另一个版本, by obj.fake_cirno

```typst
#set math.equation(numbering: "(1)")
#show math.equation.where(block: true): it => {
  if it.has("label") {
    if "-" == str(it.label) {
      counter(math.equation).update(n => n - 1)
      math.equation(it.body, block: true, numbering: none)
      return
    } else if "::" in str(it.label) {
      let (a, b) = str(it.label).split("::")
      counter(math.equation).update(n => n - 2)
      [#math.equation(it.body, block: true, numbering: _ => "(" + b + ")")#label(a)]
      return
    }
  }
  it
}

$ f(x) $

$ f(x) $ <eq:some::14a>

$ f(x) $ <->

$ f(x) $

@eq:some

```