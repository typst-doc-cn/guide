# 行内公式与中文之间没有自动空格

相关问题：想问下，typst 的盘古之白什么时候支持公式和文字之间的空格

相关 issue：https://github.com/typst/typst/issues/2703

临时修复方法：

```typst
#show math.equation.where(block: false): it => h(0.25em, weak: true) + it + h(0.25em, weak: true)
汉字$A$汉字
```
