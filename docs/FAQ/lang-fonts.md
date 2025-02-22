---
tags: [font, chinese, text]
---
# 中英文如何使用不同的字体？

::: tip ✅ Typst 0.13 已改进
[#5305](https://github.com/typst/typst/pull/5305) 增加了 `covers` 选项，请这样设置：

```typst
#set text(font: (
  (name: "Times New Roman", covers: "latin-in-cjk"),
  "SimSun"
))
分别设置“中文”和English字体
```
:::

如果你使用旧版本，请使用以下旧方案。

设置字体可以使用一个列表，Typst 会按照列表中的顺序依次尝试使用字体。因此只需把英文字体放在中文字体前面即可。例如：

```typst
#set text(font: ("Times New Roman", "SimSun"))
分别设置“中文”和English字体
```

当然，这种方式严格来说并不是“中英文使用不同的字体”，但是 99% 的情况下已经够用了。

::: details 如果你是剩下的 1%
如果你发现了中文引号等标点不对劲，那么你可以用这个修复 `#show regex("[“‘’”]|——|……"): set text(font: "SimSun")`。

如果你还需要对中文字体进行特殊处理，例如只缩小中文字体的大小，可以考虑用正则表达式[匹配 script](https://www.unicode.org/reports/tr18/tr18-21.html#Script_Property) 进行 hack：`#show regex("\p{sc=Hani}+"): set text(size: 0.8em)`。

Tracking Issue：
- 按语言配置字体 https://github.com/typst/typst/issues/794
:::
