---
tags: [label, ref]
---

# 如何让引用的 label 缺失时仍然能编译？

```typst
#show ref: it => {
  if query(it.target).len() == 0 {
    return text(fill: red, "<未找到引用" + str(it.target) + ">")
  }
  it
}

#figure(rect(), caption: "A sample figure") <fig2>
@fig1 @fig2
```
