---
tags: [text, font, smartquote]
---

# 引号的字体不对 / 引号的宽度不对

在 Typst 0.12.0 及之前的版本，你可能会写以下代码：

```typst
#set text(font: ("New Computer Modern", "Noto Serif CJK SC"))

这是“引号”和西文文字 Abcd。

这是 'smartquote'，这 "也是"。
```

```typst
#set text(font: "Noto Serif CJK SC")

这是“引号”和西文文字 Abcd。

这是 'smartquote'，这 "也是"。
```

显然，前者的全角引号被错误地使用放在首位的西文字体渲染了，这不是我们期望的行为。

Typst 0.13.0 或更新版本中，你可以使用以下方法设置：

```typst
#set text(font: ((name: "New Computer Modern", covers: "latin-in-cjk"), "Noto Serif CJK SC"))

这是“引号”和西文文字 Abcd。

这是 'smartquote'，这 "也是"。
```

然而我们会发现西文的 dumbquote `'` `"` 也被错误使用了 CJK 字体，这不是我们期望的，所以需要单独给 smartquote 加一个 show rule。

```typst
#set text(font: ((name: "New Computer Modern", covers: "latin-in-cjk"), "Noto Serif CJK SC"))

#show smartquote: set text(font: "New Computer Modern")

这是“引号”和西文文字 Abcd。

这是 'smartquote'，这 "也是"。
```