# 快速开始

## 在线使用

适用场景：快速，免安装，多人协作。

打开官网 [typst.app](https://typst.app/)，注册账号。新建文档即可。

<!--TODO
截图
--->

（官方出品的 [Pro](https://typst.app/pricing/)，热心的朋友可以试试，算是打赏一下开发者~）

## 本地安装

### VS Code（推荐）

适用场景：深度自定义，离线使用，顾及隐私。（补全体验也比官方好亿点点哦）

[安装 VS Code](https://code.visualstudio.com/)。

点击左侧扩展图标，搜索 `Tinymist` 插件并安装

![](images/20240715222928.png)

::: warning
不要安装 `Typst LSP` 插件和 `Typst Preview` 插件，这两个插件已废弃，功能已经整合到 `Tinymist` 插件中。

如果之前安装了这两个插件请卸载，否则会导致冲突。
:::

如果你需要代码格式化功能，点击左下角齿轮图标，选择设置，搜索 `tinymist formatter`，将其设置为 `typstyle`，如下图所示。

![](images/20240715223645.png)

……

typst 会自动扫描到系统中安装的字体，使用 `typst fonts` 命令可以列出所有可用的字体。

### Vim

### 命令行

Typst 的命令行工具可以通过多种方式获取，详见[官网文档](https://typst.app/open-source/#download)。此文档为各操作系统提供了手动下载和包管理器两种安装方式，并包含 PATH 环境变量的配置说明。

安装完成后，根据[官网文档](https://github.com/typst/typst?tab=readme-ov-file#usage)在命令行中编译文件。
