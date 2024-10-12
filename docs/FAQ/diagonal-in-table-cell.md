---
tags: [code, table]
---

# 如何绘制带斜线(对角线)的表格？

第三方包 [diagbox](https://github.com/PgBiel/typst-diagbox) 实现了这个功能。只需要下载[代码](https://github.com/PgBiel/typst-diagbox/blob/main/diagbox.typ) 到项目目录，然后引入其中的 `tdiagbox` 和 `bdiagbox` 即可使用。

例如:
```typst no-render
#import "diagbox.typ": *

#table(
  columns: (auto, auto, auto),
  align: horizon + center,
  bdiagbox[Names][Properties], [*Can Walk*], [*Can Run*],
  [*Character A*], [Yes], [No],
  [*Character B*], [No], [No],
)
```

注意 `bdiagbox` 中的内容必须足够大，以 "撑开" `diagbox`，不然斜线会偏离对角。如果内容实在不够长，可以适当填充 `#h`。
