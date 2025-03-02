---
tags: [package, cetz]
---

# 为何从官方文档复制的 CeTZ 导入的第三方包无法自动下载？

由于官方文档在 Installing 部分的介绍中所用的示例代码为：

```typst no-render
#import "@local/cetz:0.3.2"

#cetz.canvas({
  import cetz.draw: *
  // Your drawing code goes here
})
```

在小蓝书中我们知道：

- 如果正确配置了网路代理，当尝试导入一个外部库时，Typst 会立即启动下载线程为你从网络下载外部库代码。一般情况下，从网络下载外部库的时间不会超过十秒钟，并且不需要任何额外配置。
- Typst 的「命名空间」以 `@` 字符开头。目前仅允许使用两个命名空间：
  - `@preview`：Typst 仅开放 beta 版本的包管理机制。所有 beta 版本的都在 `@preview` 命名空间下。
  - `@local`：Typst 建议的本地库命名空间。

但由于所有在 Typst Universe 上的包都用 `@preview` 命名空间，没有例外。因此在上面的安装操作中，需要将导入代码修改为 `#import "@preview/cetz:0.3.2"`，此时可以自动实现安装 `cetz` 与导入。

事实上，文档的 Installing 部分针对本地手动安装，一般使用应参考 Usage 部分。
