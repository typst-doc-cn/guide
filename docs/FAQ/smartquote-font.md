---
tags: [text, font, smartquote]
---

# 引号的字体不对 / 引号的宽度不对

中西习惯的引号宽度不同。只设置字体时，中西总有一种引号的宽度不对。

```typst
-- #set page(height: auto, width: auto, margin: 1em)
// 引号用中文字体，西文不对
#set text(font: ((name: "New Computer Modern", covers: "latin-in-cjk"), "Source Han Serif SC"))
中文“引号”，西文 cha’DIch。

// 引号用西文字体，中文不对
#set text(font: ("New Computer Modern", "Source Han Serif SC"))
中文“引号”，西文 cha’DIch。
```

## 目标效果

- 中文使用输入法输入分前后的引号`“‘’”`，按汉字全宽显示。

- 西文使用键盘输入 ASCII 引号`"'`，让 [typst 智能转换为弯引号](https://typst.app/docs/reference/text/smartquote/)，按比例宽度显示。

```typst
-- #set page(height: auto, width: auto, margin: 1em)
-- #set text(font: ((name: "New Computer Modern", covers: "latin-in-cjk"), "Source Han Serif SC"))
-- #show smartquote: set text(font: "New Computer Modern")
这是“引号”。“我叫，‘阿毛！’没有应。”

这是 'smartquote', "double" 和撇号 cha'DIch。
```

## 设置方法

### 若中西分别设置了字体

强制智能引号使用西文字体。

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#set text(font: ((name: "New Computer Modern", covers: "latin-in-cjk"), "Source Han Serif SC"))

#show smartquote: set text(font: "New Computer Modern") // [!code ++]

这是“引号”。“我叫，‘阿毛！’没有应。”

这是 'smartquote', "double" 和撇号 cha'DIch。
```

### 若中西统一使用相同字体

如果字体质量高，可以强制智能引号调用 [OpenType 比例宽度（proportional widths, `pwid`）特性](https://learn.microsoft.com/en-us/typography/opentype/spec/features_pt#tag-pwid)。

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#set text(font: "Source Han Serif SC")

#show smartquote: set text(features: ("pwid",)) // [!code ++]

这是“引号”。“我叫，‘阿毛！’没有应。”

这是 'smartquote', "double" 和撇号 cha'DIch。
```

当然也可强制智能引号使用专门的西文字体，但那样引号高度未必合适。

更多 OpenType 特性请参考[`SourceHanSerifReadMe.pdf`](https://github.com/adobe-fonts/source-han-serif/raw/release/SourceHanSerifReadMe.pdf)中的 OpenType GSUB Features 一节。
