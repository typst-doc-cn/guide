---
tags: [font, chinese, text]
---
# 如何协调中西字体的字号？

如果[分别设置了中西字体](./lang-fonts.md)，可能需要协调字号，可考虑用正则表达式[匹配 script](https://www.unicode.org/reports/tr18/tr18-21.html#Script_Property) 进行 hack。有匹配西文、中文两种思路，都有复杂之处。

## 匹配西文

注意必须用`+`匹配一串西文，不然[字偶间距调整](https://wiki.wordsoftype.com/cn/entry/zi-ou-jianju)（[kerning](https://wiki.wordsoftype.com/en/entry/kerning)）会失效。

```typst {1}
-- #set page(width: auto, height: auto, margin: 1em)
#show regex("[0-9\p{Latin}]+"): set text(size: 1.2em, baseline: 0.02em)

= 放弃 AVANTI _Type_
放弃 AVANTI _Type_
```

## 匹配中文

匹配中文不容易选全，比如标点符号和“㈠”这种。

```typst {1}
-- #set page(width: auto, height: auto, margin: 1em)
#show regex("\p{Han}+"): set text(size: 0.9em)

= 放弃 AVANTI _Type_
放弃 AVANTI _Type_
```
