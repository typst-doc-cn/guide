---
tags: bib
---
# 如何修复英文参考文献中的“等”？

当中英文参考文献同时出现时，英文参考文献中的“等”应该是“et al.”，而不是“等”。

可以使用[手动参考文献方案](./bibitem.md)，或者

1. 使用来自 [modern-nju-thesis](https://github.com/nju-lug/modern-nju-thesis) 的 `bilingual-bibliography` 函数修复。

```typst no-render
// 在文档开头引入
#import "@preview/modern-nju-thesis:0.3.4": bilingual-bibliography

// 将原本的 #bibliography("refs.bib") 替换为
#bilingual-bibliography(bibliography: bibliography.with("refs.bib"))
```
2. 使用 [Citext](https://github.com/Shuenhoy/citext)。需要注意 Citext 使用
   citation.js/QuickJS/WebAssembly/CtxJS 替代了 Typst 原生的参考文献功能，从而可以借助 citation.js 支持 CSL-M 的扩展，但会显著降低从零编译文档的速度，请在编写过程中妥善利用 Typst 的增量编译能力（`typst watch`/`tinymist preview`）。

```typst no-render
// 在文档开头引入
// citext 未发布至 Typst Universe，请手动将仓库下载至本地
#import "./local-package/citext/lib.typ": * 

#let bib = init-citation(read("refs.bib"))
#show: show-extcite.with(bib: bib, gen-id: true)

// 将原本的 #bibliography("refs.bib") 替换为
#show bibliography: none
#bibliography("refs.bib")

= 参考文献
#extbib(bib)
```