---
tags: [svg, mermaid]
---

# 为什么 mermaid/draw.io 生成的 SVG 图片导入后没有文字？

参考 [Working with mermaid in typst](https://github.com/typst/typst/discussions/3090#discussioncomment-7960440)，mermaid 和 draw io 默认生成的 svg 图片含有 HTML Foreign Object，因此只能在浏览器中正常显示，导入到 typst 后文字会消失。

目前推荐首先使用 mermaid cli 导出 pdf，再使用 mutool 将 pdf 转换为 svg。

或直接使用位图格式（png/jpg）。
