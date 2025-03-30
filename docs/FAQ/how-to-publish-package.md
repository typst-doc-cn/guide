---
tags: [publish, template, package]
---

# 如何发布自己的包以及模板

对于比较熟悉 Typst 的朋友来说，
也许会想发布自己的包或模板分享给周围人使用。

首先所有的三方包都在官方项目中 [typst/packages: Packages for Typst.](https://github.com/typst/packages)

其中的 README 文件中也说明了步骤，
但是实践起来多少有些坑需要避免，故在此说明。

## 项目配置

首先你需要在项目的根目录中配置 `typst.toml` 这个文件，
以官方文档示例

```toml
[package]
name = "example"         # 项目名，需要使用
version = "0.1.0"        # 项目版本，一般来说是 0.1.0
entrypoint = "lib.typ"   # 项目入口文件
authors = ["Developers"] # 开发人员，可以写成 ["Your Name <@your-github-name>"]
license = "MIT"          # 许可证书
description = "..."      # 项目描述
repository = "..."       # Github 仓库目录
keywords = ["thesis"]    # 可选，项目关键字
categories = ["thesis"]  # 可选，项目类型
exclude = ["tmp"]        # 可选，排除目录

[template]               # 如果你有模板文件，可以配置该项，否则注释
path = "template"        # 模板目录
entrypoint = "main.typ"  # 模板入口，这是基于模板路径的，即 template/main.typ
thumbnail = "thumb.png"  # 缩略图路径，这是基于项目路径的
```

这里参考 Typst 大佬 OrangeX4 项目中的配置 

[nju-lug/modern-nju-thesis: 南京大学学位论文 Typst 模板 modern-nju-thesis](https://github.com/nju-lug/modern-nju-thesis/tree/main)

```toml
[package]
name = "modern-nju-thesis"
version = "0.4.0"
entrypoint = "lib.typ"
authors = ["OrangeX4"]
license = "MIT"
description = "南京大学学位论文模板。Modern Nanjing University Thesis."
repository = "https://github.com/nju-lug/modern-nju-thesis"
keywords = ["Nanjing University", "thesis"]
categories = ["thesis"]
exclude = ["imgs"]
compiler = "0.13.0"

[template]
path = "template"
entrypoint = "thesis.typ"
thumbnail = "thumbnail.png"
```

## 发布项目

### 方法一（不推荐）：`fork` + `clone` + 手动提交 PR

1. `fork` 仓库 [typst/packages](https://github.com/typst/packages)；
2. `git clone` 到本地，`cd packages` 进入项目；
3. 新建目录 `packages/preview/{你的包名}/{你的版本}/`；
4. 将你的项目文件复制进去；
5. 推送到 Github 中；
6. 提交 PR。

> 不推荐的原因是 packages 仓库太大了，clone 下来要很久，不推荐

### 方法二：`fork` + `PAC` + `Typship` 工具 + 手动提交 PR

1. 首先下载 [typship](https://github.com/sjfhsjfh/typship)；
2. 将 typship 添加到环境变量；
3. `fork` 仓库 [typst/packages](https://github.com/typst/packages)，新手不建议重命名，使用默认名字 `packages`；
4. 在 Github -> Setting -> Develop Settings -> fine-grained **P**ersonal **A**ccess **T**okens 中创建 fine-granted PAT，关于 fine-granted PAT 的介绍，可以参考- [Introducing fine-grained personal access tokens for GitHub - The GitHub Blog](https://github.blog/security/application-security/introducing-fine-grained-personal-access-tokens-for-github/)
   1. 指定你 `fork` 的仓库，不建议使用全部仓库！
   2. 赋予 `metadata` 的读权限；
   3. 赋予 `content` 读权限和写权限；
   4. 妥善保存生成的 `PAT`；
5. 回到你包项目的根目录（不是 `fork` 的仓库 `packages`）；
6. 在根目录下运行命令 `typship login universe`，输入你的 `PAT`；
7. 完成后继续运行命令 `typship publish universe`，一路回车，等待上传成功；
8. 手动提交 PR。

> 本方法不适用存在中文命名的文件，会报错
>
> [Can't upload files with Chinese characters (Uri Error) · Issue #16 · sjfhsjfh/typship](https://github.com/sjfhsjfh/typship/issues/16)

### 方法三：`fork` + `clone` + 手动提交 PR

1. 首先 `fork` 仓库 [typst/packages](https://github.com/typst/packages)，并创建一个新的分支（比如叫 `simple-template`）；
2. `git clone --filter=blob:none --no-checkout {你fork的packages地址} --branch {你新建的分支名}`；
   1. `--filter=blob:none`：启用 部分克隆（Partial Clone），只下载元数据（commit/tree 对象），不自动下载文件内容（blob）；
   2. `--no-checkout`：克隆后不自动检出文件（即工作目录为空）；
   3. `--branch {你新建的分支名}`：指定克隆分支；
3. 进入克隆的项目，`cd packages`，一般来说是空白，只有 `.git` 文件夹；
4. 运行命令 `git config core.sparsecheckout true` 表示开启稀疏检出；
5. 运行命令 `git sparse-checkout set packages/preview/{name}`，这个 `name` 需要谨慎，要和你 `typst.toml` 中的 `name` 一致
6. 在 `packages/preview/{name}` 中创建目录 `0.1.0`
7. 将你的项目里的文件手动复制进去，删除不必要的文件，提交 commit；
8. 手动提交 PR。

是不是很简单呢 😄（开玩笑）

### \*方法四：使用 Github-Action

据大佬补充，
还有 Github-Action 方法可以使用，
参考：https://github.com/typst-community/typst-package-template/blob/64726bec3bb0c664e8d7a1df4ed82d52a87465a7/.github/workflows/release.yml，
不需要在本地 clone；
不过不确定是否要求文件名纯ASCII。

> 该方法本文作者没有使用过，
> 希望有经验的大佬可以补充此条。


## 等待 PR 通过

在等待 PR 的过程中，
还需要做以下事情

1. 手机原神启动
2. 平板崩铁启动
3. 电脑绝区零启动
4. PR 通过
