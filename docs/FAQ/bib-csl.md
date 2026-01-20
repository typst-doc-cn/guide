---
tags: [bib]
outline: [2, 3]
---
# 为什么指定参考文献 CSL 后，报错“failed to load CSL style”？

Typst [已经内置](https://typst.app/docs/reference/model/bibliography/#parameters-style)了中文常用的 GB/T 7714—2015 格式；如果你使用了其它[中文 CSL 样式](https://zotero-chinese.com/styles/)，可能会遇到这种报错。

## 概论

在读取 CSL 样式方面，Typst 目前[^present]已基本完全支持 [CSL 标准](https://docs.citationstyles.org/en/stable/specification.html)。这些样式之所以无法加载，通常是因为用了非标准特性，例如 [CSL-M 扩展](https://citeproc-js.readthedocs.io/en/latest/csl-m/) 和 [citeproc-js](https://citeproc-js.readthedocs.io/en/latest/) 内部特性。

[^present]: 指 v0.14.0-rc.1 及之后的版本。

对此有两种解决思路：

- 其实大部分非标准特性只影响特殊情况。可以先**删除非标准特性**，让 Typst 能读取样式生成参考文献；等真的遇到特殊情况了，再[专门解决](https://typst-doc-cn.github.io/clreq/#x7-bibliography)或[手动编辑](https://forum.typst.app/t/how-to-manually-correct-the-format-of-bibliography-for-60-styles/5303/2)。

- 使用 [Citext](https://github.com/Shuenhoy/citext) **替代 Typst 原生**的参考文献引擎，支持非标准特性。

  这种方法可以根除问题，但会拖慢编译，而且有时需要调用特殊函数而不能单纯`@key`。详见[另一页面的专门小节](./bib-etal-lang.md#citext)。

下面具体介绍第一种方法。

## 如何删除非标准特性

::: tip
对于 [Zotero 中文社区的 CSL 样式](https://zotero-chinese.com/styles/)，不必阅读后文，可直接前往[可用于 Hayagriva 的 CSL 样式](https://typst-doc-cn.github.io/csl-sanitizer/)下载批量修改好的版本。
:::

首先需**定位问题**。请将文件上传到 [CSL Validator](https://typst-doc-cn.github.io/csl-validator/)，选择 CSL 1.0.2 (current)，正常应出现下面这种结果。

> Oops, I found 8 errors.
>
> **Errors**
>
> 1. Line 42: Bad value `citation-range-delimiter` for attribute `name` on element `term` from namespace `http://purl.org/net/xbiblio/csl`.
>
>    ```xml
>    ms>
>      <term name="citation-range-delimiter">-</ter
>    ```
>
> 2. …

::: details CSL Validator 提示 No errors found，但 Typst 仍然无法加载 CSL？

> CSL Validator: Good job! No errors found.

CSL Validator 与 Typst/Hayagriva 毕竟原理不同，“CSL Validator 认为合法”与“Typst 认为合法”其实并无严格蕴含关系。

遇到这种情况，可尝试用 Typst 持续编译文档，然后**二分法**依次删除各个`<macro>`来定位问题。
:::

接着结合 Typst 的报错，**逐一修改**各项错误。

例如上例可能伴随 Typst 报错 data did not match any variant of untagged enum Term，与 CSL Validator 第一个错误写的 term 相关，那就找到 CSL 文件的第 42 行，删除或注释`citation-range-delimiter`这行。修改后，如果 Typst 仍然无法加载 CSL，就继续处理下一个错误，直到解决。

以下列出了**常见报错以及解决方法**，大致按常见程度降序排列，可供参考。

### duplicate field `layout`

Typst 暂不支持 CSL-M 标准，可以注释掉多余的 `<layout>` 临时解决。

在 CSL 文件里搜索 `bibliography` 和 `citation`，这里通常有多个 `<layout>` ，一般建议注释掉 `<layout locale="en">` 这一段 `<layout>` 。例子如下

```xml {2,7}
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

### unknown variant `institution`, expected one of `name`, `et-al`, `label`, `substitute`

请在 CSL 文件里注释掉`<institution/>`。

```xml
<macro name="secondary-contributors-en">
  <names variable="translator">
    <name/>
    <institution/><!-- [!code del] -->
    <!-- <institution/> --> <!-- [!code ins] -->
    <label form="short" prefix=" "/>
  </names>
</macro>
```

### data did not match any variant of untagged enum Term

该错误有多种可能原因。

若 CSL 文件中包含`citation-range-delimiter`等非标准`<term>`，请删除它们，例如：

```xml
<locale>
  <terms>
    <term name="citation-range-delimiter">-</term><!-- [!code del] -->
    <term name="page-range-delimiter">-</term>
  </terms>
</locale>
```

::: details 原因
按照 GB/T 7714—2015，同一处连续引用多篇文献时，起讫序号间用短横线连接，例如`[255-256]`。这个短横线默认是`–`（U+2013 EN DASH），以上`citation-range-delimiter`将它修改为`-`（U+002D HYPHEN-MINUS）。不过`citation-range-delimiter`超出了 [CSL 规范](https://docs.citationstyles.org/en/stable/specification.html)和 [CSL-M 扩展](https://citeproc-js.readthedocs.io/en/latest/csl-m/)，是 [citeproc-js](https://github.com/Juris-M/citeproc-js/) 单独实现的，Typst 并不识别。

<!-- https://github.com/zotero-chinese/styles/discussions/439#discussioncomment-12031020 -->
:::

常见的非标准`<term>`如下。

- `citation-range-delimiter`可删除
- `space-et-al`可替换为`et-al`
- `en-et-al`、`zh-et-al`、`et-al-zh`等也可替换为`et-al`
- `long-ordinal-11`、`long-ordinal-12`（CSL 标准规定最大到 10）可删除

此外，个别 CSL 文件错误地把`<term>`当成`<macro>`用。这种情况需要理解文件原本意图才能改正，建议直接向 CSL 维护者提出。

### data did not match any variant of untagged enum TextTarget/Variable

请替换非标准的变量（variable），例如：

```xml
<if variable="original-container-title"><!-- [!code del] -->
<if variable="container-title"><!-- [!code ins] -->
  <group delimiter=": ">
    <text variable="original-container-title"/><!-- [!code del] -->
    <text variable="container-title"/><!-- [!code ins] -->
    <text macro="volume"/>
  </group>
</if>
```

常见的非标准变量及解决办法如下。

- `<text term="unpublished"/>`是过时的 CSL-M 扩展，可替换为`<text value="Unpublished"/>`

- 标准之外的`original-*`变量可去除`original-`前缀，常见的有：

  - `original-container-title`、`original-container-title-short`
  - `original-genre`
  - `original-event-title`、`original-event-place`
  - `original-editor`
  - `original-status`
  - `original-issue`
  - `original-jurisdiction`

- `<if variable="CSTR">`涉及[2025年新版国标](https://std.samr.gov.cn/gb/search/gbDetailed?id=4507EFE13D37CB6AE06397BE0A0A601F)引入的[科技资源标识 (CSTR)](https://std.samr.gov.cn/gb/search/gbDetailed?id=71F772D81092D3A7E05397BE0A0AB82A)，目前无法输入。可先在 CSL 删除整段`<if>`，然后在著录各篇文献时把`CSTR: …`作为文本夹带进相邻位置的字段。

此外，个别 CSL 文件错误地把变量当成`<macro>`用。这种情况需要理解文件原本意图才能改正，建议直接向 CSL 维护者提出。

### missing field `$value`

CSL 标准规定`<else>`、`<group>`、`<layout>`等元素必须有内容。如果为空（或者只有注释），就会报告此错误。

对于`<else>`和`<group>`，通常是 CSL 维护者调试时忘记清理，直接把整段元素删掉即可。例如：

```xml
<choose>
  <if variable="URL">
  <text variable="URL"/>
  </if>
  <else><!-- [!code del] -->
    <!-- <text variable="DOI" prefix="https://doi.org/"/> --> <!-- [!code del] -->
  </else><!-- [!code del] -->
</choose>
```

对于`<layout>`，应该是工具性 CSL 刻意为之，可填充空字符串解决。

```xml
<citation>
  <layout/><!-- [!code del] -->
  <layout><!-- [!code ins] -->
    <text value=""/><!-- [!code ins] -->
  </layout><!-- [!code ins] -->
</citation>
```

### unknown variant ``, expected one of `lowercase`, `uppercase`, `capitalize-first`, `capitalize-all`, `sentence`, `title`

请删掉空的`text-case`属性。

```xml
<text variable="title" text-case=""/><!-- [!code del] -->
<text variable="title"/><!-- [!code ins] -->
```

### invalid locator

把`locator`属性改为标准规定的小写。

```xml
<if locator="Chapter"><!-- [!code del] -->
<if locator="chapter"><!-- [!code ins] -->
```
