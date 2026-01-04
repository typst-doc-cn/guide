---
tags: bib
---
# 如何在 .typ 文件内著录参考文献，而不拆分出 .bib 等文件？

[`bibliography`](https://typst.app/docs/reference/model/bibliography/#parameters-sources)也接受原始`bytes`作为源，例如：

````typst
-- #set page(height: auto, margin: 1em)
Cite them as usual: @key

#let bib = ```bib
@misc{key,
  title = {Title},
}
```.text
#bibliography(bytes(bib), style: "gb-7714-2015-numeric")
````

来源：[How to insert bibliography entries as code to avoid importing .bib file](https://forum.typst.app/t/how-to-insert-bibliography-entries-as-code-to-avoid-importing-bib-file/6529)

## 其它用法

若同时使用 BibLaTeX `.bib`和 Hayagriva `.yaml`两种格式，可组成列表一并输入。

````typst
-- #set page(height: auto, width: auto, margin: 1em)
#set text(lang: "zh")

正常引用即可@work-bib @work-yaml。

#bibliography(
  (
    ```bib
    @article{work-bib,
      title = {A work from BibLaTeX},
    }
    ```.text,
    ```yaml
    work-yaml:
      type: article
      title: A work from Hayagriva
      parent:
        type: periodical
    ```.text,
  ).map(bytes),
  style: "gb-7714-2015-numeric",
)
````

<!-- 上例的 work-yaml 必须标注 parent，不然到了 CSL 会变成档案[A]，与 work-bib 的期刊文章[J]不同 -->
