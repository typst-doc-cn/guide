# 如何去掉标题的编号后面的空格？

很遗憾，这空格是 [代码里写死的](https://github.com/typst/typst/blob/23746ee18901e08852306f35639298ad234d3481/crates/typst/src/model/heading.rs#L243)，并不能通过设置关掉。

不过从代码里可以看到，它实际上是个 `h(0.3em)`，于是我们可以想到两种方法解决：

### 方法 1：反向空格抵消掉

```typst
#set heading(numbering: it => {
  numbering("一、", it) + h(-0.3em)
})
= 标题
= 思考
```

### 方法 2：给他 show 成 none

```typst
#set heading(numbering: "一、")
#show heading: it => {
  show h.where(amount: 0.3em): none
  it
}
= 标题
= 思考
```
