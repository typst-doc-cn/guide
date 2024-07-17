# 常见问题

## 为什么字体这么奇怪

![](images/20240715132539.png)

因为你没有指定中文字体，请参考下一个问题。

## 如何安装（中文）字体？
首先，在源代码文件中需要使用类似 `#set text(font: "LXGW WenKai", lang: "zh")` 的命令设置字体（此处使用霞鹜文楷）。然后根据环境配置字体文件的搜索方式:
- 在 typst.app 上编辑：直接上传字体文件。
- 在本地 VS Code 引入字体：默认可以使用系统安装的字体。除此以外，也可以通过给 tinymist 指定设定值 tinymist.fontPaths 等使它找到字体文件位置。不过注意使用 VSCode 打开单文件（区别于打开文件夹）时这一功能可能不可用。
- 使用 Typst CLI：使用 --font-path 参数。

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

<details>
<summary>参考阅读：</summary>
https://github.com/typst/typst/issues/1210
</details>

![](https://github.com/user-attachments/assets/9dcb568e-2888-4b27-ae4e-cbe19507bf78)

微调凑合一下吧

```typst
#set underline(offset: .1em, stroke: .05em, evade: false)
#underline[1234一二三四“”""]
```

![](https://github.com/user-attachments/assets/51067bed-18f7-4e08-a571-38a37eae92c8)

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

## 如何让 inline 公式显示成 display 公式？

```typst
#show math.equation.where(block: false): math.display

已知 $f(x)=1/2 x^2$

```
