---
tags: [label, ref]
links:
  - https://github.com/typst/typst/issues/4035
---

# 如何让引用的 label 缺失时仍然能编译？

```typst
#show ref: it => {
  if it.element == none {
    return text(fill: red, "<未找到引用" + str(it.target) + ">")
  }
  it
}

#figure(rect(), caption: "A sample figure") <fig2>
@fig1 @fig2
```

<!-- 以上`it.element == none`在旧版是`query(it.target).len() == 0`，原因不明，可能是以下提到的 hack context 引发了思维定势 -->

::: warning

以上规则会把引用的文献误判为缺失标签。目前区分这两种情况比较困难，需要[自行扫描`*.bib`](https://forum.typst.app/t/is-there-a-way-to-suppress-errors-in-case-of-a-missing-reference/3255/5)或 [hack `context`机制](https://sitandr.github.io/typst-examples-book/book/typstonomicon/try_catch.html)。

:::

---

在 typst 0.14 等特定版本，上述代码对于 bibliography 的引用 (`cite`) 失效。一种解决方法是自行扫描 `*.bib`:

```typst no-render
#import "@preview/citegeist:0.2.0": load-bibliography

#let all-bib-entries() = {
  let bib-file = {
    let all-bib = query(bibliography)
    if all-bib.len() > 0 {
      all-bib.at(0).sources.at(0)
    } else {
      none
    }
  }
  if bib-file == none {
    (:)
  } else {
    load-bibliography(read(bib-file))
  }
}

#let possible-missing-ref(it) = {
  if str(it.target) in all-bib-entries() or it.element != none {
    it
  } else {
    text(fill: red, "<未找到引用" + str(it.target) + ">")
  }
}

#show ref: possible-missing-ref
```
