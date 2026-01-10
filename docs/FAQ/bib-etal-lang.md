---
tags: bib
---
# 如何修复英文参考文献中的“等”？

当中英文参考文献同时出现时，英文参考文献中的“等”应该是“et al.”，而不是“等”。

## 法一：替换字符

导入 [modern-nju-thesis](https://github.com/nju-lug/modern-nju-thesis) 的 `bilingual-bibliography` 函数，将英文参考文献中的`等`、`译`等汉字替换为英文。

```typst no-render
// 在文档开头引入
#import "@preview/modern-nju-thesis:0.3.4": bilingual-bibliography

// 将原本的 #bibliography("refs.bib") 替换为
#bilingual-bibliography(bibliography: bibliography.with("refs.bib"))
```

这种方法简单快速，能覆盖大部分场景。

## 法二：替换参考文献引擎 {#citext}

使用 [Citext](https://github.com/Shuenhoy/citext) 替换 Typst 默认的参考文献引擎[^citext-details]。

1. 在文档开头引入

   ```typst no-render
   // citext 未发布至 Typst Universe，请手动将仓库下载至本地
   #import "./local-package/citext/lib.typ": *

   #let bib = init-citation(read("refs.bib"))
   #show: show-extcite.with(bib: bib, gen-id: true)
   ```

2. 在`#bibliography("refs.bib")`前后添加

   ```typst no-render
   #show bibliography: none
   #bibliography("refs.bib") // 与法一不同，法二需保留这行

   = 参考文献
   #extbib(bib)
   ```

这样可以真正实现按文献语言自动切换渲染方式；不过由于替换了引擎，会显著降低从零编译文档的速度，请在编写过程中妥善利用 Typst 的增量编译能力（`typst watch`/`tinymist preview`）。

此外，同一处引用多篇文献时，不能单纯`@key-a @key-b`，需要调用专门的`mulcite`函数。更多细节请阅读 [Citext 的 README](https://github.com/Shuenhoy/citext)。

[^citext-details]: Typst 的参考文献样式采用 CSL 标准，但 CSL 无法描述如何按文献语言切换渲染方式。[CSL-M 扩展](https://citeproc-js.readthedocs.io/en/latest/csl-m/)增加了这一功能，但 Typst 所用参考文献引擎尚不支持。Citext 使用 [citation.js](https://citation.js.org/) + [QuickJS](https://crates.io/crates/rquickjs) + [WebAssembly](https://typst.app/docs/reference/foundations/plugin/) + [CtxJS](https://typst.app/universe/package/ctxjs) 替代了 Typst 原生的参考文献功能，从而可以通过 citation.js 调用 [citeproc-js](https://citeproc-js.readthedocs.io) 来支持 CSL-M。

## 法三：手动录入参考文献

请参考[手动参考文献方案](./bibitem.md)。
