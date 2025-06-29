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
