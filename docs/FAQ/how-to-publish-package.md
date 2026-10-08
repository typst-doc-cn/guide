---
outline: [2, 3]
tags: [publish, template, package]
---

# 如何发布自己的包以及模板

对于比较熟悉 Typst 的朋友来说，也许会想发布自己的包或模板分享给周围人使用。

首先所有的三方包都在官方仓库 [typst/packages](https://github.com/typst/packages) 中，其[`docs/*.md`](https://typst-community.github.io/extra-docs/packages/submission.html)也说明了步骤；但是实践起来多少要绕一些坑，故在此说明。

## 配置项目

首先要在项目的根目录创建`typst.toml`文件。官方说明简要翻译成中文如下。

```toml
[package]
name = "example"          # 项目名称
version = "0.1.0"         # 项目版本，一般来说是 0.1.0
entrypoint = "lib.typ"    # 项目入口文件
authors = ["Developers"]  # 开发人员，可以写成 ["Your Name <@your-github-name>"]
license = "MIT"           # 授权协议
description = "..."       # 项目描述
repository = "https://github.com/OWNER/REPO" # GitHub 仓库地址，可选但一般要填
keywords = ["foo", "bar"] # 可选，关键词，会用于 Typst Universe 的搜索功能
categories = ["thesis"]   # 可选，项目类型，需从 List of categories 中选
exclude = ["img"]         # 可选，用户使用时无需下载的文件，例如 README 插入的效果图

# 模板包还需要以下几项；若是普通包（比如只提供若干函数），则只需写上面几项
[template]
path = "template"            # 模板目录，typst init 会复制这个目录中的文件
entrypoint = "main.typ"      # 模板入口，相对于上一项填的 path，即此例代表 template/main.typ
thumbnail = "thumbnail.png"  # 缩略图，相对于项目根目录
```

可参考 Typst 大佬 OrangeX4 的[南京大学学位论文模所用`typst.toml`](https://github.com/nju-lug/modern-nju-thesis/blob/main/typst.toml?rgh-link-date=2026-10-08T16%3A00%3A00.000Z)：

```toml
[package]
name = "modern-nju-thesis"
version = "0.4.1"
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

更多细节请参考官方说明的 [Package manifest](https://typst-community.github.io/extra-docs/packages/manifest.html) 以及该页链接的相关页面。

## 发布项目

> 以下假设你已清楚`git commit`、`git push`等 git 基础知识，并知道如何在 GitHub 上发起 PR (pull request)。

### 方法〇：fork + 克隆 + 手动提交 PR {#basic}

此方法在概念上最简单，建议阅读一下，了解你大致会做什么；但实操时并不推荐这么干。

1. [fork 官方仓库 typst/packages](https://github.com/typst/packages/fork)；
2. 克隆 fork 所得仓库到本地；
3. 在仓库中创建目录`packages/preview/{项目名称}/{项目版本}/`，并将项目文件复制进去；
4. 提交修改，推送到 GitHub，然后向官方仓库发起 PR。

> 不推荐的原因是 packages 仓库太大了，上传下载会非常慢。

### 方法一：Typship 工具 + fork + PAT + 手动提交 PR {#typship}

😡 由于 GitHub 莫名其妙封禁了 Typship 的主要开发者 sjfhsjfh，而且迟迟不解封，目前使用此方法十分困难。建议换用方法二或方法三。

::: details 方法一详情

1. 首先下载 [typship](https://github.com/sjfhsjfh/typship)；
2. 将 typship 添加到环境变量；
3. `fork` 仓库 [typst/packages](https://github.com/typst/packages)，新手不建议重命名，使用默认名字 `packages`；
4. 在 [GitHub → Settings → Developer Settings → fine-grained **P**ersonal **A**ccess **T**okens](https://github.com/settings/personal-access-tokens) 中创建 fine-grained PAT。关于 fine-grained PAT 的介绍，可以参考 [Introducing fine-grained personal access tokens for GitHub - The GitHub Blog](https://github.blog/security/application-security/introducing-fine-grained-personal-access-tokens-for-github/)
   1. 指定你 `fork` 的仓库，不建议使用全部仓库！
   2. 赋予 `metadata` 的读权限；
   3. 赋予 `content` 读权限和写权限；
   4. 妥善保存生成的 `PAT`；
5. 回到你包项目的根目录（不是 `fork` 的仓库 `packages`）；
6. 在根目录下运行命令 `typship login universe`，输入你的 `PAT`；
7. 完成后继续运行命令 `typship publish universe`，一路回车，等待上传成功；
8. 手动提交 PR。

> 本方法不适用与名称包含汉字的文件，Typship 处理这种文件会报错。
>
> [Can't upload files with Chinese characters (Uri Error) · Issue #16 · sjfhsjfh/typship](https://github.com/sjfhsjfh/typship/issues/16)

:::

> 其实除了 Typship，社区里还有其它[五花八门的 Typst 包管理器](https://ydx-2147483647.github.io/best-of-typst/#pkg)。其中某些也支持发布项目，亦可尝试。

### 方法二：fork + 特殊克隆操作 + 手动提交 PR {#sparse-checkout}

> 此法相当于官方说明中的 [Sparse checkout of the repository — Further tips](https://typst-community.github.io/extra-docs/packages/tips.html#sparse-checkout-of-the-repository)。

1. [fork 官方仓库 typst/packages](https://github.com/typst/packages/fork)。

   克隆时要记住页面上显示的 owner（自己的GitHub用户名，例如`OrangeX4`）和 repository name（fork 所得仓库的名称，可修改，但建议新手先保留默认的`packages`，日后有需要再去仓库设置修改）。

2. 依次运行以下两个命令，其中`{OWNER}`要替换成刚才记住的 owner，例如`git clone … ssh://git@github.com/OrangeX4/packages`。

   运行后应该会创建一个名称与 repository name 相同的文件夹。

   ```shell
   git clone --filter="tree:0" --depth 1 --no-checkout ssh://git@github.com/{OWNER}/packages
   cd packages
   ```

   ::: details 以上命令的补充提示

   这里给`git clone`设置了以下三个选项。

   - `--filter=tree:0`——采用特殊克隆方法，此命令先只下载元数据（commit 对象），以后再按需下载文件列表和内容（tree 和 blob 对象）。细节可参考 [GitHub Blog 的解释](https://github.blog/open-source/git/get-up-to-speed-with-partial-clone-and-shallow-clone/)。
   - `--depth 1`——只克隆最新提交
   - `--no-checkout`——克隆后不检出文件，即`cd packages`后是一片空白，只有`.git`文件夹。

   另外，若克隆较慢，可尝试把`ssh://git@github.com/`改为`ssh://git@ssh.github.com:443/`。

   :::

3. 依次运行以下几个命令，其中`{项目名称}`要替换成`typst.toml`中填的`package.name`，例如`modern-nju-thesis`。

   这些命令会配置稀疏检出，并为后续提交 PR 做好准备。

   ```shell
   git sparse-checkout init
   git sparse-checkout set packages/preview/{项目名称}
   git remote add upstream ssh://git@github.com/typst/packages
   git config remote.upstream.partialclonefilter tree:0
   git switch main
   git switch --create {项目名称}
   ```

4. 在`packages/preview/{项目名称}`中新建文件夹，名称与`typst.toml`中填的`package.version`保持一致，例如`0.1.0`。然后将需要上传到 Typst Universe 的项目文件复制进去（测试脚本之类的无需上传）。

5. 提交修改，推送到 GitHub，然后向官方仓库发起 PR。

是不是很简单呢 😄（开玩笑；不过做过一次应该就还好了）

### 方法三：使用 GitHub Actions {#github-actions}

据大佬补充，配置好相关密钥后，还可利用 GitHub Actions 直接发布，绕开本地操作。

具体方法请参考以下任一仓库中的`.github/workflows/*.yml`。

- [`release.yml` · typst-community/typst-package-template](https://github.com/typst-community/typst-package-template/blob/main/.github/workflows/release.yml?rgh-link-date=2026-10-08T16%3A00%3A00.000Z)

- [`publish.yml` · hongjr03/typst-zebraw](https://github.com/hongjr03/typst-zebraw/blob/main/.github/workflows/publish.yml?rgh-link-date=2026-10-08T16%3A00%3A00.000Z)（修改自 typst-community/typst-package-template）

- [`release-typst.yml` · Myriad-Dreamin/shiroa](https://github.com/Myriad-Dreamin/shiroa/blob/main/.github/workflows/release-typst.yml?rgh-link-date=2026-10-08T16%3A00%3A00.000Z)（采用 shiroa 作者定制的 Typship）

> 此类方法本文作者没有使用过，也不确定是否要求文件名纯ASCII。希望有经验的大佬可以补充此条。

## 提交 PR 后

~~等待 PR 通过时，还要做以下事情：手机原神启动，平板崩铁启动，电脑绝区零启动……~~

提交 PR 后几分钟，机器人 typst-package-check 会给出初步反馈。这些反馈一般有对有错，按实际情况处理即可。

提交 PR 后几小时到几天，Ana Gelez (elegaanz)、Tobias Schmitz (saecki) 等 Typst 工作人员会人工审核。他们主要是检查项目名称与内容是否合规，并简单验证项目实现的正确性。这一阵要关注 GitHub 消息，因为有时候要处理审核意见（反驳或者按意见修改项目）。如果我们能在当天回应，他们一般也会在十几分钟内回复。人工审核后，几乎所有 PR 都会被合并。

PR 被合并后，编译 Typst 文档基本立即就能使用这个包；不过 Typst Universe 网页要等几小时才会刷新。
