---
tags: [bib]
---
# 为什么指定参考文献 CSL 后，报错`failed to load CSL style`？

Typst [已经内置](https://typst.app/docs/reference/model/bibliography/#parameters-style)了中文常用的 GB/T 7714—2015 格式；如果你使用了 [GB/T 7714—2015 相关 CSL 样式变体](https://github.com/redleafnew/Chinese-STD-GB-T-7714-related-csl)，可能会遇到这些报错。

## ``(duplicate field `layout`)``

Typst 暂不支持 CSL-M 标准，可以注释掉多余的 `<layout>` **临时**解决。

在 csl 文件里搜索 `bibliography`，这里通常有多个 `<layout>` ，一般建议注释掉 `<layout locale="en">` 这一段 `<layout>` 。例子如下

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

这样修改之后，csl 根据文献语言自动使用“等”或“et al.”的功能会失效，请见[如何修复英文参考文献中的“等”](./bib-etal-lang.md)。

## ``(unknown variant `institution`, expected one of `name`, `et-al`, `label`, `substitute`)`` 

在 csl 文件里注释掉不支持的部分。
