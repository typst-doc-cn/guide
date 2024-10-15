---
tags: [code, table]
---
# 如何在代码中实现数组转置？

相关问题：如何实现表格转置？

使用 `array.zip(..data)`，例如：

```typst
#show: columns.with(2)
#let data = range(8).map(x => [#x]).chunks(4) // 这里的 data 是 2x4 的矩阵
#table(columns: 4, ..data.flatten())
#colbreak()

#table(columns: 2, ..array.zip(..data).flatten())
```
