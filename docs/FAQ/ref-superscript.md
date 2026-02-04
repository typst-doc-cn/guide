---
tags: [bib, ref]
---

# 引用参考文献时，如何共存上标和非上标形式？

按以下方法设置后，普通`@key`上标，`#parencite(<key>)`非上标。

具体方法取决于引用的默认样式是否上标。

::: warning
由于连续引用另有规则，若上标引用紧跟非上标引用，例如`#parencite(<key>) @key`，那么以下方法均会失效；不过一般没有这种需求，还可放心使用。
:::

## 若样式默认非上标（如`ieee`）

```typst
-- #set page(height: auto)
#show cite: super
#let parencite(label) = {
  show super: it => it.body
  [文献~] + ref(label)
}

你说得对，中间见#parencite(<key>)，后面忘了@key。

#bibliography(
  bytes("@phdthesis{key,
    type = {{超高校级学位论文}},
    title = {{基于图书室的笔记本电脑的 Alter Ego 系统}},
    author = {不二咲, 千尋},
    year = {2010},
    address = {某地},
    school = {私立希望ヶ峰学園},
    publisher = {私立希望ヶ峰学園},
  }"),
  style: "ieee",
)
```

## 若样式默认上标（如`gb-7714-2015-numeric`）

如果没有其它特殊需求，将`parencite`的`style`换为不上标的`ieee`即可：

```typst
-- #set page(height: auto)
#let parencite(key, ..args) = [文献~#cite(key, style: "ieee", ..args)]

你说得对，中间见#parencite(<key>)，后面忘了@key。

#bibliography(
  bytes("@phdthesis{key,
    type = {{超高校级学位论文}},
    title = {{基于图书室的笔记本电脑的 Alter Ego 系统}},
    author = {不二咲, 千尋},
    year = {2010},
    address = {某地},
    school = {私立希望ヶ峰学園},
    publisher = {私立希望ヶ峰学園},
  }"),
  style: "gb-7714-2015-numeric",
)
```

如果需要同一处连续引用多篇文献（例如`文献 [2–4]`），那么以上方法无法直接使用，因为各样式对连续引用的规则有明显差异。

这时可以[去官方样式仓库](https://github.com/citation-style-language/styles)复制所用样式的 CSL 源代码，找到`style > citation > layout`，删除`vertical-align="sup"`属性。——如果你用`gb-7714-2015-numeric`样式，那么可直接使用以下修改好的版本。

::: details parencite + 支持连续引用 + `gb-7714-2015-numeric`

````typst
-- #set page(height: auto)
#let parencite-csl = bytes(
  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <style xmlns="http://purl.org/net/xbiblio/csl" version="1.0" class="in-text" default-locale="zh-CN">
    <info>
      <title>China National Standard GB/T 7714-2015 (numeric, 中文, 只支持引用, 引用不上标)</title>
      <id>https://github.com/citation-style-language/styles/blob/a05bb4d/china-national-standard-gb-t-7714-2015-numeric.csl#L423-L430</id>
    </info>
    <citation collapse="citation-number" after-collapse-delimiter=",">
      <sort>
        <key variable="citation-number"/>
      </sort>
      <!-- 此处删除了 vertical-align="sup" -->
      <layout delimiter="," prefix="[" suffix="]">
        <text variable="citation-number"/>
      </layout>
    </citation>
  </style>
  ```.text,
)

#let parencite(..args) = {
  let keys = args.pos()
  let cite-args = args.named()
  [文献~#keys.map(k => cite(k, style: parencite-csl, ..cite-args)).join()]
}

你说得对，中间见#parencite(<key>)，后面忘了@key。

连续@a @b @c\引用#parencite(<a>, <b>, <c>)。

#bibliography(
  bytes(
    ```bib
    @phdthesis{key,
      type = {{超高校级学位论文}},
      title = {{基于图书室的笔记本电脑的 Alter Ego 系统}},
      author = {不二咲, 千尋},
      year = {2010},
      address = {某地},
      school = {私立希望ヶ峰学園},
      publisher = {私立希望ヶ峰学園},
    }
    @article{a,
      title = {孙悟空},
      date = {2026-02-24},
    }
    @book{b,
      title = {齐天大圣},
      date = {2026-02-24},
    }
    @proceedings{c,
      title = {美猴王},
      date = {2026-02-24},
    }
    ```.text,
  ),
  style: "gb-7714-2015-numeric",
)
````

:::
