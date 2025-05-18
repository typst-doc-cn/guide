---
tags: [equation, code]
---

# 矩阵的方括号感觉距离数字有点近

可以搞点 trick，自己造个 mat，加空格（

```typst
#let mat(..args)=$lr([med #math.mat(..args, delim: none) med])$
$ mat(2,3,4;5,6,7;8,9,9) $
```
