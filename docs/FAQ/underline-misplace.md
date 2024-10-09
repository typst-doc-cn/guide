# 中英文下划线错位了怎么办？

相关 issue：https://github.com/typst/typst/issues/1210

![](https://github.com/user-attachments/assets/9dcb568e-2888-4b27-ae4e-cbe19507bf78)

微调凑合一下吧

```typst
#underline[1234 一二三四“”""]

#set underline(offset: .1em, stroke: .05em, evade: false)
#underline[1234 一二三四“”""]
```
