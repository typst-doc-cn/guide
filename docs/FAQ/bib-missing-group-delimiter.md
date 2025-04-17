---
tags: bib
---

# 【已修复】参考文献引文条目中 `. `、`: ` 部分丢失

::: tip ✅ Typst 0.13 已修复
[hayagriva#269](https://github.com/typst/hayagriva/pull/269) 已经改正了 CSL 中`<choose>`和`<layout>`中分隔符的实现方法。
:::

在 CSL 中修改生成引文条目的 `macro`，向缺少 `. ` 的部分添加 `<group delimiter=". ">`。
