---
outline: [2, 3]
---

# 更新时针对的 Typst 版本

将 git 历史与 Typst 版本发布记录比较，在每页`<Layout>`页脚标注更新时针对的 Typst 版本。

## 使用方法

无需专门设置。

## 前提条件

构建文档时，有完整 git 历史。设置方法参考[最后更新于 | VitePress](https://vitepress.dev/zh/reference/default-theme-last-updated#frontmatter-config)。

## 实现细节

### 版本发布记录

为避免依赖 GitHub API，每次 Typst 发布新版本后，需要手动更新。更新方法见`typst_version.ts`。
