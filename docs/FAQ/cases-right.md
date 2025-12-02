---
tags: [math]
links:
  - https://github.com/typst/typst/issues/1191
  - https://github.com/typst/typst/issues/1478
  - https://github.com/typst/typst/issues/1767
  - https://github.com/typst/typst/issues/2562
---

# 如何让 cases 中某列右对齐？

<!-- https://github.com/typst-doc-cn/guide/issues/21#issuecomment-2912537322 -->

`cases`中的内容[刻意全部左对齐](https://github.com/typst/typst/issues/1478#issuecomment-2229249197)。

```typst
-- #set page(height: auto)
$ f = cases(
  137 & "if" (n+1) in NN,
  0   & "otherwise",
) $
```

若想让“otherwise”这列右对齐，可以换用`lr`，[使用`&`交替左右对齐](https://typst.app/docs/reference/math/#alignment)：

```typst {1}
-- #set page(height: auto)
#let lrcases(it) = math.lr($\{$ + block(it))

#lrcases($
  & 137 & "if" (n+1) in NN \
  & 0   &      "otherwise"
$)

$ f = #lrcases($
  & 137 & "if" (n+1) in NN \
  & 0   &      "otherwise"
$) $
```
