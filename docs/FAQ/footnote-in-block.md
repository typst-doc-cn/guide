---
tags: layout
---

# 如何实现框内脚注？

<!-- https://github.com/typst-doc-cn/guide/issues/21#issuecomment-2543145271 -->

```typst
-- #set page(height: auto)
#let notes = state("notes", ())
#let content-box(body) = block(
  stroke: 1pt + gray,
  inset: 8pt,
  {
    body
    parbreak()
    line()
    set text(0.8em)
    context for (i, e) in notes.get().enumerate(start: 1) [
      #super[#i] #e
      #parbreak()
    ]
    notes.update(())
  },
)
#let content-box-note(text) = {
  notes.update(s => {
    s.push(text)
    s
  })
  super(context notes.get().len())
}

#content-box[
  #lorem(5)#content-box-note[hello world]
  #lorem(5)
]
#lorem(10)

#content-box[
  #lorem(5)#content-box-note[hello world]
  #lorem(5)#content-box-note[hello world]
  #lorem(5)
]
```
