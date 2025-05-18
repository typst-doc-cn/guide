---
tags: bib
---

<!-- 由 QQ 群 zxysdp 发现-->

# 参考文献条目中不连续页码显示错误（缺少 `,`）

这是 0.12.0 时新出现的 bug，表现为 bib 内不连续页码在渲染时缺少 `,` ，如 `pages = {1--3, 5}` 被渲染为 `1-35`。

<details>
<summary>
触发条件
</summary>

1. 页码不连续，使用 `,` 分隔不连续的页码。
2. 不存在不完整的页码区间。
3. 页码均为数字开头。

下面的解决方案就是破坏第三条的条件实现的 workaround。

</details>

请手动修改 bib 内对应的的页码项，在该页码项中任意一个页码的开头位置添加[零宽空格 `U+200B`](https://unicode-explorer.com/c/200B)。

例如：（由于 `U+200B` 是不可见字符，下以 `[U+200B]` 表示字符位置）

```diff
  @phdthesis{alterego,
    type = {{超高校级学位论文}},
    title = {{基于图书室的笔记本电脑的 Alter Ego 系统}},
    author = {不二咲, 千尋},
    year = {2010},
    address = {某地},
    school = {私立希望ヶ峰学園},
    publisher = {私立希望ヶ峰学園},
-   pages = {1--3, 5},
+   pages = {[U+200B]1--3, 5},
  }
```

也可以加在 3 和 5 的前方。
