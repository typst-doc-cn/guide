---
tags: [font, chinese, raw, bug, spacing, layout]
---

# 代码块中西文间有多余的空格？

首先，你可能需要参考 [为什么中文字体这么奇怪](./strange-fonts.md) 对正文字体进行配置。然后参照 [为什么代码块里面的中文字体显示不正常？](./chinese-in-raw.md) 对于代码块内中文的进行修改。

## 它为什么是一个 Bug？

这是一个被官方开发者承认的 Bug（参见 [The feature CJK-Lantin-Spacing Misapplied on the Raw block](https://github.com/typst/typst/issues/5760)），并且需要注意的是，它可能看起来无关紧要，但是实际上有很大的造成误解的风险。例如，对于这种情况，这个特性就是无害的：

```cpp
while (true) {} // 典型的Textbook式死循环
```

但对于

```cpp
printf("这是%d段代码", 1);
```

就是有害的。因为在这种情况下，如果我们在编译的结果中在 `%d` 和 `段代码` 之间添加一个空格，它有歧义，因为我们无法判断它是否是一个空格还是一个中西文间距。

```typst
#show raw: set text(font: ("Monospace", "Source Han Serif SC"))
#raw(lang: "cpp", "printf(\"这是%d段代码\", 1)")
```

# 如何解决？

只要为源代码块取消这个特性即可。

```typst no-render
#show raw: set text(cjk-latin-spacing: none)
```

## 相关内容

- [为什么代码块里面的中文字体显示不正常？](./chinese-in-raw.md)
- [代码块中西文间有多余的空格](./cjk-latin-spacing-in-raw.md)
- [代码块里多了空格/代码块的对齐非常奇怪](./code-block-justify.md)