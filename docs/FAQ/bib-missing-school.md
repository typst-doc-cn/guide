---
tags: bib
---

# 参考文献学位论文条目 [D] 后不显示“地点: 学校名称, 年份.”

Typst 使用 [Hayagriva](https://github.com/typst/hayagriva) 管理参考文献，有不少细节问题还在逐步修复。

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
