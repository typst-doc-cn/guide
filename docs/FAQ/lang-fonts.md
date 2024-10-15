---
tags: [font, chinese]
---
# 中英文如何使用不同的字体？

设置字体可以使用一个列表，Typst 会按照列表中的顺序依次尝试使用字体。因此只需把英文字体放在中文字体前面即可。例如：

```typst
#set text(font: ("Times New Roman", "SimSun"))

Typst 你好

```

当然，这种方式严格来说并不是“中英文使用不同的字体”，但是 99% 的情况下已经够用了。

<details>
<summary>如果你是剩下的 1%</summary>

如果你发现了中文引号不对劲，那么你可以用这个修复 `#show regex("[“”]"): set text(font: "SimSun")`，并期待 Typst 更新。

Tracking Issue：https://github.com/typst/typst/issues/3385

</details>
