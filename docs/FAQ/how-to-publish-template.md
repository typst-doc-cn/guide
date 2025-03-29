---
tags: [publish, template]
---

# 如何发布自己的模板

对于比较熟悉 Typst 的朋友来说，
也许会想发布自己的模板分享给周围人使用。

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
authors = ["Developers"] # 开发人员，可以写
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
3. `fork` 仓库 [typst/packages](https://github.com/typst/packages)；
4. 在 Github -> Setting -> Develop Settings -> Personal access tokens 中创建 PAC；
   1. 指定你 `fork` 的仓库；
   2. 给 `metadata` 的读权限；
   3. 给 `content` 读权限和写权限；
   4. 妥善保存生成的 `PAC`；
5. 回到你的项目（不是 `fork` 的仓库）；
6. 在根目录下运行命令 `typship login universe`，输入你的 `PAC`；
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
5. 运行命令 `git sparse-checkout set packages/preview/{name}`，这个 `name` 需要谨慎，要和你 `typst.toml` 中的 `name` 一致；
6. 将你的项目里的文件手动复制进去，删除不必要的文件，提交 commit；
7. 手动提交 PR。

是不是很简单呢 😄（开玩笑）

## 等待 PR 通过

在等待 PR 的过程中，
需要做以下事情

1. 玩原神
2. 玩崩铁
3. 玩绝区零
4. PR 通过
