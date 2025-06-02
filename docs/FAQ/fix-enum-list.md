---
tags: [list, layout, bug]
---

# 修复列表的终极方案

Typst 当前版本容易遇到列表编号或者符号与内容错位的问题。归根到底是因为当前列表的底层实现是 `grid`，编号和内容在同一行的两个格子中，它们之间自然没有 `baseline` 约束。要让它们能够基线对齐，最直接的方法就是使用 `par` 来排版。

@Andrew 在论坛上给出了 [解决方案](https://forum.typst.app/t/how-to-make-bullet-list-item-bodies-flow-like-paragraphs/3756/3) 。

```typst
-- #set page(height: auto, width: 14cm)
#let correctly-indent-list-and-enum-items(doc) = {
  let first-line-indent() = if type(par.first-line-indent) == dictionary {
    par.first-line-indent.amount
  } else {
    par.first-line-indent
  }

  show list: li => {
    for (i, it) in li.children.enumerate() {
      let nesting = state("list-nesting", 0)
      let indent = context h((nesting.get() + 1) * li.indent)
      let marker = context {
        let n = nesting.get()
        if type(li.marker) == array {
          li.marker.at(calc.rem-euclid(n, li.marker.len()))
        } else if type(li.marker) == content {
          li.marker
        } else {
          li.marker(n)
        }
      }
      let body = {
        nesting.update(x => x + 1)
        it.body + parbreak()
        nesting.update(x => x - 1)
      }
      let content = {
        marker
        h(li.body-indent)
        body
      }
      context pad(left: int(nesting.get() != 0) * li.indent, content)
    }
  }

  show enum: en => {
    let start = if en.start == auto {
      if en.children.first().has("number") {
        if en.reversed { en.children.first().number } else { 1 }
      } else {
        if en.reversed { en.children.len() } else { 1 }
      }
    } else {
      en.start
    }
    let number = start
    for (i, it) in en.children.enumerate() {
      number = if it.has("number") { it.number } else { number }
      if en.reversed { number = start - i }
      let parents = state("enum-parents", ())
      let indent = context h((parents.get().len() + 1) * en.indent)
      let num = if en.full {
        context numbering(en.numbering, ..parents.get(), number)
      } else {
        numbering(en.numbering, number)
      }
      let max-num = if en.full {
        context numbering(en.numbering, ..parents.get(), en.children.len())
      } else {
        numbering(en.numbering, en.children.len())
      }
      num = context box(
        width: measure(max-num).width,
        align(right, text(overhang: false, num)),
      )
      let body = {
        parents.update(arr => arr + (number,))
        it.body + parbreak()
        parents.update(arr => arr.slice(0, -1))
      }
      if not en.reversed { number += 1 }
      let content = {
        num
        h(en.body-indent)
        body
      }
      context pad(left: int(parents.get().len() != 0) * en.indent, content)
    }
  }
  doc
}

#show: correctly-indent-list-and-enum-items
#set enum(indent: 1em)

+ #lorem(12)
  + #lorem(12)
  + #lorem(12)
+ #lorem(12)
+ #lorem(12)
```

如果需要排版成原本列表的样子，可以通过设置段落的悬挂缩进来实现，例如 `#set par(hanging-indent: 1.2em)`。
