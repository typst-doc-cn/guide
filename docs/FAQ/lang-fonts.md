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

如果你发现了中文引号等标点不对劲，那么你可以用这个修复 `#show regex("[“‘’”]|——|……"): set text(font: "SimSun")`，并期待 Typst 更新。

如果你还需要对中文字体进行特殊处理，例如只缩小中文字体的大小，可以考虑用正则表达式[匹配 script](https://www.unicode.org/reports/tr18/tr18-21.html#Script_Property) 进行 hack：`#show regex("\p{sc=Hani}+"): set text(size: 0.8em)`。

Tracking Issues：
- 按语言配置字体 https://github.com/typst/typst/issues/794
- 汉字默认等宽字体 https://github.com/typst/typst/issues/3385

</details>
