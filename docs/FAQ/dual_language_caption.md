---
tags: [figure, show]
---

# figure 的 caption 如何实现双语？

可以把双语用 `metadata` 存到 `caption` 里面，然后在 `show figure` 里面把双语拿出来

```typst
#let bifig(body, capzh, capen) = figure(
  body,
  supplement: none,
  kind: "bifig",
  caption: metadata((capzh, capen)),
)
#show figure.where(kind: "bifig"): it => {
  let (capzh, capen) = it.caption.body.value
  let c = it.counter.display("1")
  it.body
  parbreak()
  [图 #c: #capzh]
  parbreak()
  [Figure #c: #capen]
}

#bifig(rect(), "启动", "start")
```
