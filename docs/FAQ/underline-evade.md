# 下划线怎么断断续续的？

英文下划线是这样的，如果你不喜欢，可以使用 `evade: false` 参数让他变成连续的。

```typst
#underline(lorem(20))

#underline(lorem(20), evade: false)
```

但是有一说一，对于大段文字，还是默认的好看一些。
