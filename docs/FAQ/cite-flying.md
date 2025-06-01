---
tags: [bib, text]
---

# 引用编号的数字高于括号

<!-- https://github.com/typst-doc-cn/guide/issues/21#issuecomment-2900797365 -->

如果引用编号的数字高于括号`[]`，可能是字体只给数字提供了专用上标版本，而括号只有普通版本。

建议`set super(typographic: false)`，统一使用普通版本。

```typst {5}
-- #set page(height: auto)
#set text(font: "Source Han Serif SC")

孔乙己@key\上大人

#show cite: set super(typographic: false)

孔乙己@key\上大人

-- #pagebreak()
-- #let bib = ```bib
-- @misc{key,
--   title = {NeuRaLaTeX: A machine learning library written in pure LaTeX},
--   author = {James A. D. Gardner and Will Rowan and William A. P. Smith},
--   date = {2025},
--   url = {https://arxiv.org/abs/2503.24187},
-- }
-- ```.text
-- #bibliography(bytes(bib), style: "gb-7714-2015-numeric")
```
