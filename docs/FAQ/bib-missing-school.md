---
tags: bib
---

# 参考文献学位论文条目 [D] 后不显示“地点: 学校名称, 年份.”

若在`*.bib`中用`school`或`institution`著录学位授予单位，那么生成出来会丢失此项。

如需修复，请编辑`*.bib`相应条目，用`publisher`著录：

```diff
  @phdthesis{alterego,
    type = {{超高校级学位论文}},
    title = {{基于图书室的笔记本电脑的 Alter Ego 系统}},
    author = {不二咲, 千尋},
    year = {2010},
    address = {某地},
    school = {私立希望ヶ峰学園},
+   publisher = {私立希望ヶ峰学園},
  }
```

## 原因

Typst 使用 [Hayagriva](https://github.com/typst/hayagriva) 将 Bib(La)TeX `*.bib`中的文献数据与 [CSL 样式](https://docs.citationstyles.org/en/stable/specification.html)匹配，从而著录参考文献。这之中有不少细节还在逐步改善。

- GB/T 7714—2025 规定：图书、图书中的析出文献、连续出版物等文献的「出版者」有则必备，学位论文必备「学位授予单位」；报告不著录「机构」。

- [BibTeX](https://mirrors.ctan.org/biblio/bibtex/base/btxdoc.pdf) 定义了`publisher`、`institution`、`school`三个相关字段，分别著录出版者、赞助技术报告的机构、学位论文所在学校。[BibLaTeX](https://mirrors.ctan.org/macros/latex/contrib/biblatex/doc/biblatex.pdf#subsection.2.2) 同样支持这三个字段，但`institution`与`school`互为别名，不区分技术报告与学位论文。

- Hayagriva 处理`*.bib`时，`publisher`保持[`publisher`](https://typst-community.github.io/extra-docs/hayagriva/file-format.html#publisher)，而`institution`与`school`会转换为[`organization`](https://typst-community.github.io/extra-docs/hayagriva/file-format.html#organization)（两字段共存时，`institution`优先）。

- CSL 定义了`publisher`、`authority`两个相关字段。Hayagriva 将`publisher`、`organization`分别与之对应。（[typst/hayagriva#112](https://github.com/typst/hayagriva/issues/112)）

  此外 CSL-M 还增加了[`<institution>`元素](https://citeproc-js.readthedocs.io/en/latest/csl-m/index.html#cs-institution-and-friends-extension)，用于逐作者著录所属机构，但 [Typst/Hayagriva 并不支持](./bib-csl.md#unknown-variant-institution-expected-one-of-name-et-al-label-substitute)。

- 国标 CSL 样式采用`publisher`输出学位授予单位，因为 Zotero 会将该项导出为 CSL-JSON `publisher`，而国标 CSL 样式由 [Zotero 中文社区](https://zotero-chinese.com/styles/)维护。

综合以上情况，`*.bib`中的`school`字段使用国标 CSL 样式会丢失，可用`publisher`字段修复。

```typst
// 用 oxdraw 展示以上关系
-- #set page(height: auto, width: auto)
-- #import "@preview/oxdraw:0.1.0": oxdraw
-- #oxdraw("
-- graph LR
--   subgraph GB[GB/T 7714—2025]
--     出版者
--     学位授予单位
--   end
--   subgraph BibTeX
--     bibtex.publisher[publisher]
--     bibtex.school[school]
--     bibtex.institution[institution]
--   end
--   subgraph BibLaTeX
--     biblatex.publisher[publisher]
--     biblatex.institution[school / institution]
--   end
--   subgraph Hayagriva
--     haya.publisher[publisher]
--     haya.organization[organization]
--   end
--   subgraph CSL
--     csl.publisher[publisher]
--     csl.authority[authority]
--   end
--   subgraph 国标CSL样式
--     publisher
--   end
--   
--   出版者 --> bibtex.publisher
--   学位授予单位 --> bibtex.school
--   学位授予单位 -.-> bibtex.publisher
--   
--   bibtex.publisher --> biblatex.publisher
--   bibtex.school --> biblatex.institution
--   bibtex.institution --> biblatex.institution
-- 
--   biblatex.publisher --> haya.publisher
--   biblatex.institution --> haya.organization
-- 
--   haya.publisher --> csl.publisher
--   haya.organization --> csl.authority
-- 
--   csl.publisher --> publisher
-- ")
```
