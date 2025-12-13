---
outline: [2, 3]
---

# FAQ 列表及标签

在`/FAQ.md`插入 vue 组件`<FAQList>`，读取`faqlist.data`并展示。同时，在每页的`<Layout>`开头展示当前页的标签。

## 使用方法

在`/FAQ/*.md`页面正常填写标题，并在 frontmatter 的`tags`字段标注标签。示例请查看[常见问题板块 → 模板与编辑提示](./index.md#模板与编辑提示)。

## 前提条件

无特殊条件。

## 实现细节

### 标题

由于技术限制，标题的形式必须是`# …`，不能是`<h1>…</h1>`；而且标题的内容只支持普通文本，不支持 markdown。

### 标签

标签有以下两种填写格式。注意即使只有一个标签，字段也是复数`tags`，而非单数`tag`。

```yaml
tags: layout
tags: [heading, outline]
```

选择标签时，请尽量从[现有标签](../FAQ.md#outline)选取，而不要随意自创。
