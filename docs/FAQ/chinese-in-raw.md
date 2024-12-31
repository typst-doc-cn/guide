---
tags: [font, chinese, raw]
---

# 为什么代码块里面的中文字体显示不正常？

首先，请参考 [为什么中文字体这么奇怪](./strange-fonts.md) 对正文字体进行配置。

然后，对于代码块，需要在源代码文件中使用类似的命令设置字体：

```typst
#show raw : set text(font: ("DejaVu Sans Mono", "Noto Sans CJK SC"))
```

## 相关内容

- [代码块里多了空格/代码块的对齐非常奇怪](./code-block-justify.md)
