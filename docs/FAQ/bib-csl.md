---
tags: [bib]
---
# 为什么指定参考文献 CSL 后，报错“failed to load CSL style”？

Typst[已经内置](https://typst.app/docs/reference/model/bibliography/#parameters-style)了中文常用的 GB/T 7714—2015 格式；如果你使用了其它[中文 CSL 样式](https://zotero-chinese.com/styles/)，可能会遇到这些报错。

## ``(duplicate field `layout`)``

Typst 暂不支持 CSL-M 标准，可以注释掉多余的 `<layout>` **临时**解决。

在 CSL 文件里搜索 `bibliography`，这里通常有多个 `<layout>` ，一般建议注释掉 `<layout locale="en">` 这一段 `<layout>` 。例子如下

```xml
<bibliography entry-spacing="0" et-al-min="4" et-al-use-first="3" second-field-align="flush">
  <!--
  <layout locale="en">
    <text variable="citation-number" prefix="[" suffix="]"/>
    <text macro="entry-layout"/>
  </layout>
  -->
  <layout>
    <text variable="citation-number" prefix="[" suffix="]"/>
    <text macro="entry-layout"/>
  </layout>
</bibliography>
```

（示例来自 [Zotero 上的 China National Standard GB/T 7714-2015 (numeric, 中文)](https://www.zotero.org/styles/china-national-standard-gb-t-7714-2015-numeric)，原作者见此文件，依 CC-BY-SA 3.0 协议使用）

这样修改之后，CSL 根据文献语言自动使用“等”或“et al.”的功能会失效，请见[如何修复英文参考文献中的“等”](./bib-etal-lang.md)。

## ``(unknown variant `institution`, expected one of `name`, `et-al`, `label`, `substitute`)`` 

在 CSL 文件里注释掉不支持的部分。

## `(data did not match any variant of untagged enum Term)`

该错误有多种可能原因。若 CSL 文件中包含`citation-range-delimiter`，请删除相应`<term>`，例如：

```diff
  <locale>
    <terms>
-     <term name="citation-range-delimiter">-</term>
      <term name="page-range-delimiter">-</term>
    </terms>
  </locale>
```

<details>
  <summary>原因</summary>

  按照 GB/T 7714—2015，同一处连续引用多篇文献时，起讫序号间用短横线连接，例如`[255-256]`。这个短横线默认是`–`（U+2013 EN DASH），以上`citation-range-delimiter`将它修改为`-`（U+002D HYPHEN-MINUS）。不过`citation-range-delimiter`超出了 [CSL 规范](https://docs.citationstyles.org/en/stable/specification.html)和 [CSL-M 扩展](https://citeproc-js.readthedocs.io/en/latest/csl-m/)，是 [citeproc-js](https://github.com/Juris-M/citeproc-js/) 单独实现的，Typst 并不识别。

  <!-- https://github.com/zotero-chinese/styles/discussions/439#discussioncomment-12031020 -->
</details>

若并无`citation-range-delimiter`，或者删除后仍然报错，恐怕是 CSL 文件有误，可尝试二分法依次删除各个`<macro>`来定位问题。
