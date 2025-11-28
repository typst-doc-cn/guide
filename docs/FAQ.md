# 常见问题

本文档收录了日经问题（QQ 群中经常有人问的问题），以及[官方文档](https://typst.app/docs/reference/)和[小蓝书](https://typst-doc-cn.github.io/tutorial/)中未提到的一些零碎的使用技巧。

由于问题已有数十个，单页面实在是太长，因此将每个问题拆开了。请活用页面上方的搜索框查找问题。

::: tip
阅读本文档之前，推荐首先阅读[官方文档](https://typst.app/docs/reference/)和[小蓝书](https://typst-doc-cn.github.io/tutorial/)。
:::

如果页面上的内容有错误或者对内容有疑问，可以直接[提交 issue](https://github.com/typst-doc-cn/guide/issues/new/choose)

## 问题目录 {#outline}

<FAQList />

## 如何贡献

### 修改已有的页面

每个下面下方会都有 `在 GitHub 上编辑此页面` 按钮，点击即可编辑页面内容。

### 创建新页面

点击这个链接创建一个新的 `.md` 文件，编辑完成 commit 后提交 pull request 即可。

https://github.com/typst-doc-cn/guide/new/master/docs/FAQ

:::: details 模板

````md
---
tags: [template, code]
---

# 问题/页面标题

写一些说明文字。

如果你需要展示 demo，可以像下面这样使用 typst 代码块。

```typst
Let $a$, $b$, and $c$ be the side
lengths of right-angled triangle.
Then, we know that:
$ a^2 + b^2 = c^2 $

Prove by induction:
$ sum_(k=1)^n k = (n(n+1)) / 2 $
```

上面的代码块在生成文档时，会自动调用 typst 编译器生成预览图片并附在代码块后面。从而让网站维护者和读者知道这段代码是可以正常使用的。

如果你的代码片段还需要与其他内容配合，不能直接运行，可以在语言后面加上 no-render，这样的代码块就不会被渲染，例如下面这个：

```typst no-render
// 设置中英文字体
#set text(font: ((name: "New Computer Modern", covers: "latin-in-cjk"), "Noto Serif CJK SC"), lang: "zh")
```

嗯，暂时没有需要补充的了。
````

注意：渲染器在将文档中的 typst 代码渲染成图片时会自动在前面插入这两行代码，避免生成的图片过大，改善阅读体验。因此需要较大的页面展示代码效果的时候记得手动设置页面尺寸。

```typst no-render
<!--@include: @/.vitepress/typst_template.ts{2,3} -->
```

对于设置页面这种与正文关系不大的代码，可于行首加`-- `，在渲染时隐藏。

::: details 示例：隐藏代码

`.md` 文件：

```typst no-render
-- #set page(width: auto, height: auto, margin: 1em)
#lorem(1)
```

渲染结果：

```typst
-- #set page(width: auto, height: auto, margin: 1em)
#lorem(1)
```

:::

最后，如果问题已在新版 typst 修复或改进，可在标题开头添加`【已修复】`，并注明版本。

```md
# 【已修复】……？

::: tip ✅ Typst 0.0 已修复/已改进
[#000](https://github.com/typst/typst/pull/000) 已经……
:::
```

::::
