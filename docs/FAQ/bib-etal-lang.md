---
tags: bib
outline: [2, 3]
---
# 如何修复英文参考文献中的“等”？

著录多著者文献时可能省略部分作者，这时著录中文应加“等”，著录英文则应加“et al.”。然而目前 Typst 只支持用`#set text(lang: …)`统一选择“等”（`"zh"`）或“et al.”（`"en"`），不支持逐文献设置。

若需按文献语言自动选择“等”或“et al.”，主要有以下两类办法：

- [**替换字符**](#modern-nju-thesis)——简单快速，推荐使用

- **替换参考文献引擎**——根治问题，但有其它缺点，具体有 [citext](#citext)、[gb7714-bilingual](#gb7714-bilingual) 等选择

本页会依次介绍这些方法；此外也可考虑[手动录入参考文献](./bibitem.md)。

<!--
以下若干“完整测试例子”采用的 BibTeX 文献数据不能合并。

BibTeX/BibLaTeX 有 language 和 langid 两个字段，以及 zh/en 和 chinese/english 两种填写方式（前者是 Unicode/ISO 的标识，后者是 LaTeX 包 babel/polyglossia 的标识，所以其实都算“ID”）。
截至2026年2月，按照 Zotero 中文社区传统，默认导出 langid = chinese/english，修改设置可改为导出 language = zh/en 或二者兼有。

于是考虑各方情况，发现三个例子各有各的情况：
- modern-nju-thesis 会自动识别语言，无需标注 language 或 langid；但也不能标注，因为它获取不到源数据，标注了也无效。
- citext 不会自动识别语言，故必须标注 language = zh/en；注意按标注 langid = chinese/english 无效，因为 citext 不识别。
- gb7714-bilingual 会自动识别语言，无需标注 language 或 langid；它也支持标注，但提倡的填写方式和 Zotero 中文社区相反，所以这里选择不标注。

参考资料：
- TeXdoc biblatex (v3.2.1, 2025-07-10)
  https://texdoc.org/serve/biblatex/0
- TeXdoc biblatex-gb7714-2015 (v1.1v, 2025-06-10)
  https://texdoc.org/serve/biblatex-gb7714-2015/0
- Exporting `language` fields in addition to `langid` — Frequently Asked Questions | Better BibTeX for Zotero
  https://retorque.re/zotero-better-bibtex/support/faq/index.html#exporting-language-fields-in-addition-to-langid
- CSL 样式问题：中英文混排 — 关于 Word 引用的各种问题 | Zotero 中文社区
  https://zotero-chinese.com/user-guide/faqs/word-addon#中英文混排
-->

## 法一：替换字符 {#modern-nju-thesis}

导入 [modern-nju-thesis](https://github.com/nju-lug/modern-nju-thesis) 的 `bilingual-bibliography` 函数，将英文参考文献中的`等`、`译`等汉字替换为英文。

```typst no-render
// 在文档开头引入
#import "@preview/modern-nju-thesis:0.4.0": bilingual-bibliography

// 将原本的 #bibliography("refs.bib") 替换为
#bilingual-bibliography(bibliography: bibliography.with("refs.bib"))
```

- **优点**
  - 简单快速，能覆盖大部分场景
  - 不会增加格式问题
  - 性能不受影响，与 Typst 内置方式无明显差异
- **缺点**
  - 可能存在误判，毕竟本质上是几十行查找替换（例：[译者只有一个且名字包含逗号时，“tran(s)”单复数无法正确处理](https://github.com/nju-lug/modern-nju-thesis/blob/68f521d6ca28db02863f8841da08ed081044cf0c/utils/bilingual-bibliography.typ#L92)）

::: details 完整测试例子

````typst
-- #set page(height: auto, width: 24em, margin: 1em)
#import "@preview/modern-nju-thesis:0.4.0": bilingual-bibliography

- 中文@吴伟仁2017
- 英文@su2025

#let bib = ```bib
@article{吴伟仁2017,
  title = {软着陆任务设计},
  author = {{吴伟仁} and {王琼} and {唐玉华} and {于国斌} and {刘继忠} and {张玮} and {宁远明} and {卢亮亮}},
}
@article{su2025,
  title = {South {{Pole}}–{{Aitken}}},
  author = {Su, Bin and Chen, Yi and Wang, Zeling and Zhang, Di and Chen, Haojie and Gou, Sheng and Yue, Zongyu and Liu, Yanhong and Yuan, Jiangyan and Tang, Guoqiang and Guo, Shun and Li, Qiuli and Lin, Yang-Ting and Li, Xian-Hua and Wu, Fu-Yuan},
}
```.text

#bilingual-bibliography(bibliography: bibliography.with(bytes(bib)))
````

:::

## 替换参考文献引擎

法一基于 Typst 内置的参考文献引擎，另一类方法是替换参考文献引擎，具体有 [citext](#citext)、[gb7714-bilingual](#gb7714-bilingual) 等选择。这类方法有如下共同特点。

- 共同**优点**
  - 真正按文献语言自动切换渲染方式
- 共同**缺点**
  - 同一处引用多篇文献时，（因`show cite`规则限制）不能单纯`@key-a @key-b`，必须调用专门的`mulcite`或`multicite`函数
  - 对文字之外的格式支持不好（例：长URL折行时，链接异常）
  - 不支持导出为 HTML（因为使用了`grid`、`hide`等语义弱的函数）

### 法二：换用 citext {#citext}

使用 [citext](https://github.com/Shuenhoy/citext) 替换 Typst 内置的参考文献引擎。

0. 安装 citext

   citext 未发布至 Typst Universe，需手动安装。具体有两种选择：

   - 单纯下载[仓库](https://github.com/Shuenhoy/citext)，把`package/`文件夹保存为自己项目内的`./local-package/citext/`。
   - 按 [README 提示](https://github.com/Shuenhoy/citext?tab=readme-ov-file#install)，安装为 local package。

   第一种方法相对简单，而且支持 typst.app 在线应用，可优先尝试。

1. 在文档开头引入

   ```typst no-render
   #import "./local-package/citext/lib.typ": *
   // 若安装为 local package，请将上一行替换为：
   // #import "@local/citext:0.4.0": *

   #let bib = init-citation(read("refs.bib"))
   #show: show-extcite.with(bib: bib, gen-id: true)
   ```

2. 在`#bibliography("refs.bib")`前后添加

   ```typst no-render
   #show bibliography: none
   #bibliography("refs.bib") // 与其它方法不同，法二需保留这行

   = 参考文献
   #extbib(bib)
   ```

- **优点**

  - 真正按文献语言自动切换渲染方式

  - 同时能解决其它文字格式问题

    因为 citext 使用了 [Zotero 中文社区维护的 CSL 样式](https://zotero-chinese.com/styles/GB-T-7714—2015（顺序编码，双语）/)和相关成熟技术栈

- **缺点**

  - 性能很差

    由于替换了引擎，会显著降低从零编译文档的速度（从一秒慢到十几秒），请在编写过程中妥善利用 Typst 的增量编译能力（`typst watch`/`tinymist preview`）。

  - 替换参考文献引擎的若干[共同缺点](#替换参考文献引擎)

更多细节请阅读 [citext 的 README](https://github.com/Shuenhoy/citext)。

::: details citext 的技术栈

Typst 的参考文献样式采用 CSL 标准，但 CSL 无法描述如何按文献语言切换渲染方式。[CSL-M 扩展](https://citeproc-js.readthedocs.io/en/latest/csl-m/)增加了这一功能，但 Typst 所用参考文献引擎尚不支持。

citext 使用 [citation.js](https://citation.js.org/) + [QuickJS](https://crates.io/crates/rquickjs) + [WebAssembly](https://typst.app/docs/reference/foundations/plugin/) + [CtxJS](https://typst.app/universe/package/ctxjs) 替代了 Typst 原生的参考文献功能，从而可以通过 citation.js 调用 [citeproc-js](https://citeproc-js.readthedocs.io) 来支持 CSL-M。

:::

::: details 完整测试例子

````typst
-- #set page(height: auto, width: 24em, margin: 1em)
#import "@local/citext:0.4.0": extbib, init-citation, show-extcite

#let bib-content = ```bib
@article{吴伟仁2017,
  title = {软着陆任务设计},
  author = {{吴伟仁} and {王琼} and {唐玉华} and {于国斌} and {刘继忠} and {张玮} and {宁远明} and {卢亮亮}},
  language = {zh},
}
@article{su2025,
  title = {South {{Pole}}–{{Aitken}}},
  author = {Su, Bin and Chen, Yi and Wang, Zeling and Zhang, Di and Chen, Haojie and Gou, Sheng and Yue, Zongyu and Liu, Yanhong and Yuan, Jiangyan and Tang, Guoqiang and Guo, Shun and Li, Qiuli and Lin, Yang-Ting and Li, Xian-Hua and Wu, Fu-Yuan},
  language = {en},
}
```.text

#let bib = init-citation(bib-content)
#show: show-extcite.with(bib: bib, gen-id: true)

- 中文@吴伟仁2017
- 英文@su2025

#show bibliography: none
#bibliography(bytes(bib-content))

= 参考文献
#extbib(bib)
````

:::

### 法三：换用 gb7714-bilingual {#gb7714-bilingual}

使用 [gb7714-bilingual](https://typst.app/universe/package/gb7714-bilingual) 替换 Typst 内置的参考文献引擎。

```typst no-render
// 在文档开头引入
#import "@preview/gb7714-bilingual:0.2.1": init-gb7714, gb7714-bibliography
#show: init-gb7714.with(read("refs.bib"), style: "numeric", version: "2015")

// 将原本的 #bibliography("refs.bib") 替换为
#gb7714-bibliography()
```

- **优点**

  - 真正按文献语言自动切换渲染方式
  - 性能较好，仅略微慢于 Typst 内置方式，实用基本无感

- **缺点**

  - 可能增加其它文字格式问题，因为该引擎是2026年1月新开发的，尚不稳定
  - 替换参考文献引擎的若干[共同缺点](#替换参考文献引擎)

更多细节请阅读 [gb7714-bilingual – Typst Universe](https://typst.app/universe/package/gb7714-bilingual)。

另外还可使用同作者开发的 [citrus](https://typst.app/universe/package/citrus)（又名 citeproc-typst），原理相同，支持一般 CSL，但因为代码逻辑更复杂而性能相对低下。

<!-- gb7714-bilingual 与 citrus 的定位：https://github.com/pku-typst/gb7714-bilingual/issues/9#issuecomment-3877885158 -->

::: details 完整测试例子

````typst
-- #set page(height: auto, width: 24em, margin: 1em)
#import "@preview/gb7714-bilingual:0.2.1": gb7714-bibliography, init-gb7714

#let bib = ```bib
@article{吴伟仁2017,
  title = {软着陆任务设计},
  author = {{吴伟仁} and {王琼} and {唐玉华} and {于国斌} and {刘继忠} and {张玮} and {宁远明} and {卢亮亮}},
}
@article{su2025,
  title = {South {{Pole}}–{{Aitken}}},
  author = {Su, Bin and Chen, Yi and Wang, Zeling and Zhang, Di and Chen, Haojie and Gou, Sheng and Yue, Zongyu and Liu, Yanhong and Yuan, Jiangyan and Tang, Guoqiang and Guo, Shun and Li, Qiuli and Lin, Yang-Ting and Li, Xian-Hua and Wu, Fu-Yuan},
}
```.text

#show: init-gb7714.with(bib, style: "numeric", version: "2015")

- 中文@吴伟仁2017
- 英文@su2025

#gb7714-bibliography()
````

<!-- 目前结果中的标题是英文，因为 https://github.com/pku-typst/gb7714-bilingual/issues/8 -->

:::
