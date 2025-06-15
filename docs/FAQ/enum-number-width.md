---
tags: [list, layout]
---

# 严格控制 enum 编号宽度，而不是随最大编号位数变化

## 问题

如下例，`enum`编号所占宽度默认随最大编号位数变化。连用多组`enum`时，这样可能显得没对齐。

```typst
-- #set page(height: auto)
= 一位数
+ 一位数
+ 一位数
+ 一位数
+ 一位数

= 两位数
8. 两位数
+ 两位数
+ 两位数
+ 两位数
```

## 解决办法

用`box`严格控制宽度。

```typst
#set enum(numbering: n => box(numbering("1.", n), width: 1.5em)) // [!code ++]

-- #set page(height: auto)
= 一位数
+ 一位数
+ 一位数
+ 一位数
+ 一位数

= 两位数
8. 两位数
+ 两位数
+ 两位数
+ 两位数
```

