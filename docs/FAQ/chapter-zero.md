---
tags: [numbering, heading]
---

# 如何实现第零章

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
#set heading(numbering: n => numbering("第一章", n - 1))
= 这对吗
= 你说得对
= 但是原神
```
