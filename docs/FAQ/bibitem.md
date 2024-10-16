---
tags: bib
---
# 如何手动输入参考文献？

相关问题：如何实现 LaTeX 的 `bibitem` ？

```typst
#let bibitem(body)=figure(kind: "bibitem", supplement: none, body)
#show figure.where(kind: "bibitem"): it=>box(width: 2em, it.counter.display("[1]"))+it.body+parbreak()
#show ref: it=>{
  let e=it.element
  if e.func()==figure and e.kind=="bibitem"{
    let loc=e.location()
    return link(loc, numbering("[1]", ..e.counter.at(loc)))
  }
  it
}

@ref1 @ref2

#heading(numbering: none)[参考文献]
#bibitem[你说得对] <ref1>
#bibitem[但是原神] <ref2>
```

可是，为什么要用 `figure` 来实现呢？

因为目前（0.12 版本）没有自定义元素，`figure` 有个 `kind` 属性可以直接 `query`，而且 `supplement` 和 `caption` 可以用来提供额外信息，所以用它非常合适。
