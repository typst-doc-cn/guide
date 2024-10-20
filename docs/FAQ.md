# 常见问题

本文档收录了日经问题（QQ 群中经常有人问的问题），以及[官方文档](https://typst.app/docs/reference/)和[小蓝书](https://typst-doc-cn.github.io/tutorial/)中未提到的一些零碎的使用技巧。

由于问题数量已达到 50 余个，单页面实在是太长，因此将每个问题拆开了。请活用页面上方的搜索框查找问题。

::: tip
阅读本文档之前，推荐首先阅读[官方文档](https://typst.app/docs/reference/)和[小蓝书](https://typst-doc-cn.github.io/tutorial/)。
:::

## 问题目录 {#outline}

<FAQList />

## 如何贡献

### 修改已有的页面

每个下面下方会都有 `在 GitHub 上编辑此页面` 按钮，点击即可编辑页面内容。

### 创建新页面

点击这个链接创建一个新的 `.md` 文件，编辑完成 commit 后提交 pull request 即可。

https://github.com/typst-doc-cn/guide/new/master/docs/FAQ

模板如下：

````md
---
tags: [template, code]
---

# 问题/页面标题

一些说明文字

```typst
文件中这样的 typst 代码块会被渲染为图片
```

```typst no-render
这样的代码块不会被渲染
```
````

注意：渲染器在将文档中的 typst 代码渲染成图片时会自动在前面插入这两行代码，避免生成的图片过大，改善阅读体验。因此需要较大的页面展示代码效果的时候记得手动设置页面尺寸。
```typst no-render
#set page(height: 4cm, width: 6cm)
#set text(font: ("New Computer Modern", "Source Han Serif SC"))
```
