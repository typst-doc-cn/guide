---
title: 能通过看 link 里头的内容来判断颜色吗？
tags: [code, show]
---

比如 link to lable 用橙色，link to URL 用蓝色这种

```typst
#show link: it => {
  let fill = if type(it.dest) == str {
    blue
  } else if type(it.dest) == label {
    if str(it.dest).starts-with("tab:") {
      red
    } else if str(it.dest).starts-with("eq:") {
      green
    }
  }
  set text(fill: fill)
  it
}

https://github.com/typst

#link(<tab:table1>)[A table]
#link(<eq:equation1>)[An equation]

#figure[] <tab:table1>
#figure[] <eq:equation1>
```
