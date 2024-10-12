---
tags: bib
---

# 如何修复英文参考文献中的“等”？

当中英文参考文献同时出现时，英文参考文献中的“等”应该是“et al.”，而不是“等”。

可以使用上面的手动参考文献方案，或者使用来自 [modern-nju-thesis](https://github.com/nju-lug/modern-nju-thesis) 的 `bilingual-bibliography` 函数修复。

```typst no-render
// 在文档开头引入
#import "@preview/modern-nju-thesis:0.3.4": bilingual-bibliography

// 将原本的 #bibliography("refs.bib") 替换为
#bilingual-bibliography(bibliography: bibliography.with("refs.bib"))
```
