---
tags: [numbering, heading]
---

# 如何实现第零章

::: tip “第零章”的原本设计

[“第零章”表示首章尚未出现](https://typst.app/docs/reference/model/numbering/#parameters-numbers)，会用于首章以前的小节、图表。

```typst
-- #set page(height: auto, width: auto, margin: 1em)
#set heading(numbering: "1.1")
== 第零章的小节
= 第一章
```

不过若无这种内容，首章按“第零章”也无妨。

:::

代码是死的，人是活的。虽然 `counter` 不能设置为负数，但我们可以直接指定整个编号。

```typst
-- #set page(height: auto)
#set heading(numbering: "第一章")
#heading(numbering: (..) => "第零章")[这对吗]
#counter(heading).update((a, ..) => a - 1)
= 你说得对
= 但是原神
#heading(numbering: (..) => "第π章")[对的兄弟]
```

或者显示编号的时候减去 1

```typst
#set heading(
  numbering: n => numbering("第一章", n - 1),
)
= 这对吗
= 你说得对
= 但是原神
```

::: details Typst v0.14.0 需要特别更改

以上用 v0.14.0 编译时，`n - 1`会报告以下错误。

> Number must be at least zero

这是因为`n`在排版收敛之前可能为零，导致`n - 1`是负值，让`numbering`报错。为避免报错，让排版继续迭代，需要把`n - 1`改为`calc.max(n - 1, 0)`或`calc.abs(n - 1)`，以保证非负。

参考 [Why the heading number can be zero in v0.14.0-rc.2? - Questions - Typst Forum](https://forum.typst.app/t/why-the-heading-number-can-be-zero-in-v0-14-0-rc-2/6585?u=y.d.x) 以及 [v0.14.1 更新说明](https://typst.app/docs/changelog/0.14.1/#model) 提到的 [#7459](https://github.com/typst/typst/issues/7459)。

v0.14.1 已经修复了这处回退，不再需要特别更改。

:::
