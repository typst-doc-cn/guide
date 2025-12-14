# 镜像链接

实现了 markdown-it 扩展`mirror_link`，将[中文社区导航、教程、文档等站点](../index.md#推荐资料)的链接替换为[镜像](../index.md#本站镜像)。

## 使用方法

在任何页面用 markdown 语法正常创建源站的链接即可。示例如下。

- 输入：`[教程](https://typst-doc-cn.github.io/tutorial/)`
- 输出：
  - 若`$VP_PROFILE`为`default`或`netlify`，则同输入
  - 若`$VP_PROFILE`为`cloudflare`，则为`[教程](https://tutorial.typst.dev/)`
  - 若`$VP_PROFILE`为`vercel`，则为`[教程](https://typst.dev/tutorial/)`

## 前提条件

环境变量：`$VP_PROFILE`设置为`default`、`netlify`、`cloudflare`、`vercel`之一，或不设置（等同于`default`）。

## 实现细节

### 链接格式

- 若链接到某个站点的首页，则 URL 必须带有末尾的`/`，不然无法正确替换为镜像。

- 若某个链接直接用`https://…`创建（而未使用`[…](https://…)`语法），则 URL 仍会被替换为镜像，但显示的文字不会。还是推荐用`[…](https://…)`创建链接。

### base

[`base`](https://vitepress.dev/reference/site-config#base)也会随`$VP_PROFILE`变化。

### 关闭替换

如果某个链接需要保持原始 URL，可用`no-mirror`关闭替换，例如：

```markdown
[GitHub Pages](https://typst-doc-cn.github.io/guide/){data-no-mirror=true}
```

### 其它扩展

其它扩展可以调用这个扩展提供的`toMirror`函数。
