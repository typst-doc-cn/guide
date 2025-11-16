---
tags: [text]
outline: [2, 3]
---

# 如何控制嵌套 emph 和 strong 的样式？

在“show–函数”内嵌套 show 规则，可以设置`strong(emph(…))`和`emph(strong(…))`的样式。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
#show strong: set text(red)
#show emph: set text(yellow)

#show strong: it => {
  show emph: set text(green)
  it
}
#show emph: it => {
  show strong: set text(blue)
  it
}

- *Strong*
- _Emph_
- *_Strong(Emph)_*
- _*Emph(Strong)*_
```

（来源：[How to prevent conflicts between emph and strong overrides for Chinese text? - Questions - Typst Forum](https://forum.typst.app/t/how-to-prevent-conflicts-between-emph-and-strong-overrides-for-chinese-text/5764/5)）

## show 规则的优先顺序

show 规则的原理可能和你想得不一样，导致调试困难，所以在此一并解释下。

（以下内容摘自 [Which show rule takes precedence? - Questions - Typst Forum](https://forum.typst.app/t/which-show-rule-takes-precedence/3904/15)）

### “show–set”规则：设置所选内容的样式

“show–set”规则设置所选内容的样式，后续同类规则可以覆盖先前样式。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
#show heading: set text(purple)
#show heading: set text(green)
= Green
```

上例约等于以下内容，靠后的`green`覆盖了靠前的`purple`。

```typst no-render
#heading({
 set text(purple)
 set text(green)
 [Green]
})
```

### “show–函数”规则：给所选内容套一层函数

“show–函数”规则给所选内容套一层函数，后续同类规则会在此基础上叠加。注意 show 规则始终应用于“所选内容”，而这未必等于先前“show–函数”的返回值。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
#show heading: it => { set text(purple); it }
#show heading: it => { set text(green); it }
= Purple
```

上例约等于以下内容……

```typst no-render
#show heading: it => { set text(purple); it }
#{
  set text(green)
  heading[Purple]
}
```

……又继续约等于以下内容。因此靠前的`purple`最终生效。

```typst no-render
#{
  set text(green)
  {
    set text(purple)
    heading[Purple]
  }
}
```

“show–函数”规则套上的函数一般很难解下，除非所选内容本身提供方法，比如`it.body`。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
#show heading: it => { set text(purple); it }
#show heading: it => { set text(green); it.body }
= Green
```

### 更复杂的例子

多次用“show-set”规则设置样式，相当于只设置了最后一次。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
-- #set block(inset: 0.5em)
#show list: set block(stroke: purple)
#show list: set block(stroke: green)

- List
  - Nested
  - List
- Recursive!
```

多次用“show-函数”规则包装函数，相当于包装了好几层函数。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
-- #set block(inset: 0.5em)
#show list: block.with(stroke: purple)
#show list: block.with(stroke: green)
// 等价版本：
// #show list: it => block(stroke: purple, it)
// #show list: it => block(stroke: green, it)

- List
  - Nested
  - List
- Recursive!
```

更复杂的“show-函数”规则例子如下。

```typst
-- #set page(width: auto, height: auto, margin: 1em)
-- #set block(inset: 0.5em)
#show list: it => {
  set block(stroke: purple)
  grid(columns: 2, gutter: 1em, it, [Purple])
}
#show list: it => {
  set block(stroke: green)
  grid(columns: 2, gutter: 1em, it, [Green])
}

- List
  - Nested
  - List
- Recursive!
```

### 总结

- “show–set”规则是专门给设置样式设计的，优先使用。
- “show–函数”规则不是专门设计的，但表达能力强，遇到`strong(emph(…))`这种没办法的情况再用。
