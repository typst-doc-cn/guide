---
outline: [2, 3]
---

# “另请参见”链接

通过 vite 扩展`MarkdownTransform`在`/FAQ/*.md`每页下方插入 vue 组件`<SeeAlso>`，读取`see_also.data`并展示出来。

## 使用方法

对于中文支持方面的大部分页面，数据源于 [clreq-gap for typst](https://typst-doc-cn.github.io/clreq/) 项目提供的[`index.json`](https://typst-doc-cn.github.io/clreq/index.json)，不需要在此专门设置。

对于其它页面，可在 frontmatter 设置`links`字段，类型为`(string | { url: string; title?: string })[]`。这里 GitHub 链接会自动生成 title，不必专门设置。示例如下。

```markdown
---
tags: [label, ref]
links:
  - https://github.com/typst/typst/issues/4035
  - url: https://unicode.org/faq/han_cjk
    title: Unicode 常见问题：中文和日文
---
```

## 前提条件

必需：初次运行时需要有网，能访问到[`index.json`](https://typst-doc-cn.github.io/clreq/index.json)。

可选：设置环境变量`$GITHUB_TOKEN`。（用于访问 GitHub GraphQL API，无需任何特殊权限）

## 实现细节

### 缓存格式

缓存存储在项目中的`/target/cache/`。

允许整体删除缓存文件夹，也允许删除单个文件。
