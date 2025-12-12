---
outline: [2, 3]
prev:
  text: 快速开始
  link: /quick-start
next:
  text: 关于本站
  link: /about
---

# 参与指南

本站是由志愿者推动的开源项目，依赖广大人民群众支持。

如果您发现缺漏错误，或有疑问建议，欢迎到 [QQ 群 793548390（Typst 非官方中文交流群）](https://qm.qq.com/q/MQO6j6jCw2)或 [GitHub Issues](https://github.com/typst-doc-cn/guide/issues/) 提出。

若您还有意直接编辑本站，请继续阅读。遇到问题可前往以上 QQ 群或 [GitHub Discussions](https://github.com/typst-doc-cn/guide/discussions/) 求助。

## 常见问题版块

[常见问题](../FAQ.md)版块以问答形式收录了各种零碎使用技巧，目前已积累数十条。

### 修改已有页面

1. 单击页面下方的`在 GitHub 上编辑此页面`按钮，按提示进行准备工作（登录、创建 fork 等）
2. 编辑 markdown 文件
3. 单击右上角 _Commit changes…_，按提示完成编辑（简要介绍修改，发起 pull request 等）
4. 稍等片刻，机器人会将新版文档渲染成网页，评论到 pull request 下。可视情况继续编辑

本站使用 VitePress 构建文档，编辑时可参考 [Markdown 扩展 | VitePress](https://vitepress.dev/zh/guide/markdown#markdown-file-inclusion)。

### 创建新页面

1. [单击此处链接，在`docs/FAQ/`文件夹创建新文件](https://github.com/typst-doc-cn/guide/new/master/docs/FAQ)
2. 填写以`.md`结尾的文件名，例如`chinese-bold.md`
3. 后续步骤与“修改已有页面”相同

### 模板与编辑提示

````md
---
tags: [template, code]
---

# 问题/页面标题

写一些说明文字。

如果你需要展示例子，可以像下面这样使用 typst 代码块。

```typst
Let $a$, $b$, and $c$ be the side
lengths of right-angled triangle.
Then, we know that:
$ a^2 + b^2 = c^2 $

Prove by induction:
$ sum_(k=1)^n k = (n(n+1)) / 2 $
```
````

文档生成器遇到上面这种以` ```typst … ``` `包裹的代码块，会调用 typst 编译器生成预览图片，附在代码块后面。这样其他维护者和读者能确定这段代码可以正常使用。

为避免生成的图片过大，改善阅读体验，文档生成器会在你写的 typst 代码前插入以下两行。如果你需要较大页面展示代码效果，记得手动设置页面尺寸。

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

此外，如果某个代码块需要与其它内容配合，不能直接编译，那么可在语言后标注`no-render`，跳过编译。例如：

````markdown
```typst no-render
// 设置中英文字体
#set text(lang: "zh", font: (
  (name: "New Computer Modern", covers: "latin-in-cjk"),
  "Noto Serif CJK SC"
))
```
````

最后，如果问题已在新版 typst 修复或改进，可在标题开头添加`【已修复】`，并注明版本。

```md
# 【已修复】……？

::: tip ✅ Typst 0.0 已修复/已改进
[#000](https://github.com/typst/typst/pull/000) 已经……
:::
```

## 本地预览

本地预览需要配置 Node.js 工具链、字体、GitHub token 等，比较麻烦，一般使用 pull request 机器人即可。如果您确实想本地预览，请参考[仓库 README](https://github.com/typst-doc-cn/guide)。

## 本站扩展

本站对 VitePress 做了若干扩展，已列于侧边栏菜单。这些页面仅为方便维护而记录，一般编辑时无需阅读。

此外，Typst 发布新版本后，请参考[如何升级 Typst 版本](./update.md)。
