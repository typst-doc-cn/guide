---
tags: [bib, ref]
---

# 如何让参考文献引用的上标和非上标形式共存？

```typst
#show ref: super
#let plain-ref(label) = {
  show super: it => it.body
  ref(label)
}

你说得对，中间见文献#plain-ref(<bib1>)，后面忘了@bib1

#bibliography(
  bytes("@phdthesis{bib1,
    type = {{超高校级学位论文}},
    title = {{基于图书室的笔记本电脑的 Alter Ego 系统}},
    author = {不二咲, 千尋},
    year = {2010},
    address = {某地},
    school = {私立希望ヶ峰学園},
    publisher = {私立希望ヶ峰学園},
  }"),
)

```
