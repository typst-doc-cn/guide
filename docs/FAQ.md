# 常见问题

## 为什么字体这么奇怪

![](images/20240715132539.png)

因为你没有指定中文字体，请参考下一个问题。

## 如何安装（中文）字体？
首先，在源代码文件中需要使用类似 `#set text(font: "LXGW WenKai", lang: "zh")` 的命令设置字体（此处使用霞鹜文楷）。然后根据环境配置字体文件的搜索方式:
- 在 typst.app 上编辑：直接上传字体文件。如果不方便上传字体，可以使用自带的 `#set text(font: ("New Computer Modern", "Noto Serif CJK SC"), lang: "zh")`。
- 在本地 VS Code 引入字体：默认可以使用系统安装的字体。除此以外，也可以通过给 tinymist 指定设定值 `tinymist.fontPaths` 等使它找到字体文件位置。不过注意使用 VS Code 打开单文件（区别于打开文件夹）时这一功能可能不可用。
- 使用 Typst CLI：使用 `--font-path` 参数。

## 中英文如何使用不同的字体？

设置字体可以使用一个列表，Typst 会按照列表中的顺序依次尝试使用字体。因此只需把英文字体放在中文字体前面即可。例如：

```typst
#set text(font: ("Times New Roman", "SimSun"))

Typst 你好

```

当然，这种方式严格来说并不是“中英文使用不同的字体”，但是 99% 的情况下已经够用了。

<details>
<summary>如果你是剩下的 1%</summary>

如果你发现了中文引号不对劲，那么你可以用这个修复 `#show regex("[“”]"): set text(font: "SimSun")`，并期待 Typst 更新。

Tracking Issue：https://github.com/typst/typst/issues/3385

</details>

## 中文没有加粗

这是因为你使用的中文字体没有粗体字形。我们常用的宋体、黑体、楷体等都没有粗体字形。推荐使用支持粗体的字体，例如使用思源宋体和思源黑体。

```typst
#set text(font: ("Source Han Serif SC"))

现在可以使用*粗体*了

```

然而，某些场合可能必须使用宋体。Microsoft Word 通过给字体增加描边实现了“伪粗体”，若要实现与 Microsoft Word 同样的效果，可以使用 `cuti` 包：

```typst
#import "@preview/cuti:0.2.1": show-cn-fakebold
#show: show-cn-fakebold
#set text(font: ("Times New Roman", "SimSun"))

现在可以使用*伪粗体*了

```

## 如何输入某个符号？

（推荐）可以用这个网站手写查询：https://detypify.quarticcat.com/

Typst 符号列表：https://typst.app/docs/reference/symbols/sym/

## 公式中的正体加粗和正体，是什么代码啊？

也就是 LaTeX 中的 \mathbf 和 \mathrm

```typst
#let mathrm(x) = math.upright(x)
#let mathbf(x) = math.bold(math.upright(x))

$ y=3+4 mathrm(i) $

$ nabla times mathbf(H) $
```

## 如何实现 \mathscr 的花体符号？

群友提问：话说 typst 未来可以支持 latex 的一些数学字体，比如 mathscr 的花体，感觉确实帅

```typ
#set text(stylistic-set: 1)

$ cal(L){f(t)} = integral_(t = 0)^oo f(t) e^(- s t) dif t $
```

## 行内公式与中文之间没有自动空格

相关问题：想问下，typst 的盘古之白什么时候支持公式和文字之间的空格

相关 issue：https://github.com/typst/typst/issues/2703

临时修复方法：
```typst
#show math.equation.where(block: false): it => h(0.25em, weak: true) + it + h(0.25em, weak: true)
汉字$A$汉字
```

## 为什么第一段没有缩进？

<details>
<summary>参考阅读：</summary>
Typst 官方也意识到了这个问题，希望我们可以早日看见这一问题的解决。

Tracking Issue：https://github.com/typst/typst/issues/311
</details>

首先，英文排版是这样的，LaTeX 默认第一段也是不缩进的。其次，这部分实现有一些 bug，当前还不能通过修改设置来实现缩进。要修复这个问题，可以使用下面的方法：

### 方法1：假段落（推荐）

```typst
#set par(first-line-indent: 2em)
#let fakepar=context{box();v(-measure(block()+block()).height)}
#show heading: it=>it+fakepar
#show figure: it=>it+fakepar
#show math.equation.where(block: true): it=>it+fakepar
#let noindent()=h(-2em)

= 标题
缩进修复了

$ E=m c^2 $
#noindent()其中，$c$ 表示光速。 // 缺点是这里要手动 #noindent()

```

优点：简单优雅

缺点：图表和公式后面的段落也会默认缩进。当你需要写“其中，XXX”的时候，要手动取消缩进。

### 方法2：使用 indenta 包

```typst
#set par(first-line-indent: 2em)
#import "@preview/indenta:0.0.3": fix-indent
#show: fix-indent()

= 标题

缩进修复了

```

优点：方便自由控制图表和公式后面的段落是否缩进

缺点：可能存在一些缩进失效的情况

## 下划线怎么断断续续的？

英文下划线是这样的，如果你不喜欢，可以使用 `evade: false` 参数让他变成连续的。

```typst
#underline(lorem(20))

#underline(lorem(20), evade: false)
```

但是有一说一，对于大段文字，还是默认的好看一些。

## 中英文下划线错位了怎么办？

相关 issue：https://github.com/typst/typst/issues/1210

![](https://github.com/user-attachments/assets/9dcb568e-2888-4b27-ae4e-cbe19507bf78)

微调凑合一下吧

```typst
#set underline(offset: .1em, stroke: .05em, evade: false)
#underline[1234一二三四“”""]
```

## 如何让某个标题不编号？例如参考文献

手动调用 `heading(numbering: none)`，例如

```typst
#set heading(numbering: "第1章")

= 背景

#heading(numbering: none)[参考文献]

```

## 如何为每一级标题指定不同的编号格式？

类似问题：如何从二级标题开始编号？

为了方便起见，推荐使用 `numbly` 包。`numbly` 包的用法是，`numbly(1级编号格式, 2级编号格式, 3级编号格式, ...)`。按顺序写出每一级编号的格式，然后把其中的编号换成 `{层级:格式}` 即可，省略格式默认使用阿拉伯数字。不需要编号的层级使用 `none`。

例如，我想实现

```
第1章 背景
1.1 引言
(a) 问题
(b) 目标
1.2 方法
...
```

让我们分析一下，1 级标题使用了 1 级编号，2 级标题使用了 1 级编号和 2 级编号，3 级标题只使用了 3 级编号并使用小写字母格式（`a`）。于是对应的设置如下：

```typst
#import "@preview/numbly:0.1.0": numbly
#set heading(numbering: numbly(
  "第{1}章",
  "{1}.{2}",
  "({3:a})",
))

= 背景
== 引言
=== 问题
=== 目标
== 方法

```

## 如何让页脚的页码显示为“第1页/共N页”，同时目录中的页码使用阿拉伯数字？

为了方便起见，还是用 `numbly`

```typst
#import "@preview/numbly:0.1.0": numbly
#set text(lang: "zh")
#set page(numbering: numbly("{1}", "第{1}页/共{2}页"))
#outline()
= 你说得对
== 但是原神
```

## 如何让 inline 公式显示成 display 公式？

```typst
#show math.equation.where(block: false): math.display

已知 $f(x)=1/2 x^2$

```

## 如何获得标签所在页的页码？

其实就是获取计数器 `counter(page)` 在标签所在位置的值。

```typst
aaa <233>
#let my-link(l)=context link(l)[#counter(page).at(query(l).at(0).location()).at(0)]
aaa 在第 #my-link(<233>) 页
```

::: tip
另外注意，`counter(page).at(location)` 与 `location.position().page` 是不一样的。

前者是 `location` 位置的页码编号，这个编号可以被重置（例如第一章之前用罗马数字编号，之后用阿拉伯数字重新编号，此时可以使用 `counter(page).update(1)` 重置编号）。而后者是物理的页数，或者说，在第几张纸上。
:::

## 如何去掉标题的编号后面的空格？

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

## 如何手动输入参考文献？

相关问题：如何实现 LaTeX 的 `bibitem` ？

```typst
#let bibitem(body)=figure(kind: "bibitem", supplement: none, body)
#show figure.where(kind: "bibitem"): it=>box(width: 2em, it.counter.display("[1]"))+it.body+parbreak()
#show ref: it=>{
  let e=it.element
  if e.func()==figure and e.kind=="bibitem"{
    let loc=e.location()
    return link(loc, numbering("[1]", ..e.counter.at(loc)))
  }
  it
}

@ref1 @ref2

#heading(numbering: none)[参考文献]
#bibitem[你说得对] <ref1>
#bibitem[但是原神] <ref2>
```

## 如何修复英文参考文献中的“等”？

当中英文参考文献同时出现时，英文参考文献中的“等”应该是“et al.”，而不是“等”。

可以使用上面的手动参考文献方案，或者使用来自 [modern-nju-thesis](https://github.com/nju-lug/modern-nju-thesis) 的 `bilingual-bibliography` 函数修复。

```typst no-render
// 在文档开头引入
#import "@preview/modern-nju-thesis:0.3.4": bilingual-bibliography

// 将原本的 #bibliography("refs.bib") 替换为
#bilingual-bibliography(bibliography: "refs.bib")
```

## 如何让几个汉字占固定宽度并均匀分布？

放到 `box` 或 `block` 容器里，然后使用 `1fr` 把它们隔开即可。

```typst
#let distr(s, w: auto) = {
  block(
    width: w,
    stack(
      dir: ltr,
      ..s.clusters().map(x => [#x]).intersperse(1fr),
    ),
  )
}

#distr("姓名", w: 6em)
#distr("身份证", w: 6em)
#distr("详细地址", w: 6em)
```

## 如何让向量和矩阵使用方括号？

```typst
#set math.mat(delim: "[")
#set math.vec(delim: "[")
$ mat(1,2;3,4) $
$ vec(a,b,c) $
```

## 如何输入一个特定编号的公式？

相关问题：如何手动给公式编号？类似 LaTeX 的 `\tag{}`。

设置 `numbering` 啊，传入一个返回你想要的内容的函数即可。

```typst
#set math.equation(numbering: "(1)")
$ f(x) $
#math.equation($g(x)$, block: true, numbering: n => "(foo)")
$ h(x) $
```

## 如何实现三线表？

使用 `stroke: none` 隐藏默认边框，然后使用 `table.hline()` 画线即可。

```typst
#table(
  columns: 3,
  stroke: none,
  table.hline(),
  table.header([a], [b], [c]),
  table.hline(stroke: 0.5pt),
  [d], [e], [f],
  [g], [h], [i],
  table.hline(),
)

```

## 为什么下划线不显示？

下划线后面必须有内容才会显示，你可以加上个 `sym.zws`（零宽空格）。

TODO: 后面两个例子未整理，先放在这里。

```typst
例1：#underline[#(" " * 20)]

例2：#underline[#(" " * 20)#sym.zws]

#let uline(n) = underline(n * "\u{3000}" + sym.zws)
姓名：#uline(6)

#let uline2(width, body) = box(body, width: width, stroke: (bottom: 0.5pt), outset: (bottom: 2pt))
学号：#uline2(6em)[114514]
```

## 如何在代码中实现数组转置？

相关问题：如何实现表格转置？

使用 `array.zip(..data)`，例如：

```typst
#show: columns.with(2)
#let data = range(8).map(x => [#x]).chunks(4) // 这里的 data 是 2x4 的矩阵
#table(columns: 4, ..data.flatten())
#colbreak()

#table(columns: 2, ..array.zip(..data).flatten())
```

## 如何关闭 webapp 的拼写检查？

方法 1：点击左侧设置按钮，找到 Spellcheck，取消勾选 Enable spellchecking

方法 2：在文档开头添加

```typst no-render
#set text(lang: "zh")
```

## 如何按章节拆分文件编写？

群友反馈文件一大，preview 和浏览器都很卡。那么如何拆文件呢？

直接把内容拆分放到多个文件里即可，然后在主文件里使用 `#include "chapter1.typ"` 引入。

可能存在的问题是，label 所在的文件被注释掉之后，Typst 编译器会因为找不到引用对应的标签而报错，可以使用下面的代码修复。

```typst
#show ref: it => {
  if query(it.target).len() == 0 {
    return text(fill: red, "<未找到引用" + str(it.target) + ">")
  }
  it
}

// 注释掉前面已经定稿的部分
// #include "chapter1.typ"
// #include "chapter2.typ"

// 假设下面的部分正在编写
#figure(rect(), caption: "A sample figure") <fig2>
@fig1 @fig2
```

## 能通过看 link 里头的内容来判断颜色吗？

比如 link to lable 用橙色，link to URL 用蓝色这种

```typst
#show link: it => {
  let fill = if type(it.dest) == str {
    blue
  } else if type(it.dest) == label {
    if str(it.dest).starts-with("tab:") {
      red
    } else if str(it.dest).starts-with("eq:") {
      green
    }
  }
  set text(fill: fill)
  it
}

https://github.com/typst

#link(<tab:table1>)[A table]
#link(<eq:equation1>)[An equation]

#figure[] <tab:table1>
#figure[] <eq:equation1>
```
