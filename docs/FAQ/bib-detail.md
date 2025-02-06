---
tags: bib
---
# 参考文献格式细节不合预期？

Typst 使用 [Hayagriva](https://github.com/typst/hayagriva) 管理参考文献，有不少细节问题还在逐步修复。

## 学位论文 `[D]` 后不显示 `地点: 学校名称, 年份.` 。

Typst 暂不支持 `school` `institution` 作为 `publisher` 的别名，亦不支持解析 csl 中的 `institution`（[typst/hayagriva#112](https://github.com/typst/hayagriva/issues/112)）。如需修复，请手动修改 bib 文件内对应条目，在 `school = {学校名称},` 下加一行 `publisher = {学校名称},` ，如：

```diff
  @phdthesis{alterego,
    type = {{超高校级学位论文}},
    title = {{基于图书室的笔记本电脑的 Alter Ego 系统}},
    author = {不二咲, 千尋},
    year = {2010},
    address = {某地},
    school = {私立希望ヶ峰学園},
+   publisher = {私立希望ヶ峰学園},
  }
```

## 【已修复】引文条目中 `. `、`: ` 部分丢失。

::: tip ✅ Typst 0.13 已修复
[hayagriva#269](https://github.com/typst/hayagriva/pull/269) 已经改正了 CSL 中`<choose>`和`<layout>`中分隔符的实现方法。
:::

在 CSL 中修改生成引文条目的 `macro`，向缺少 `. ` 的部分添加 `<group delimiter=". ">`。
