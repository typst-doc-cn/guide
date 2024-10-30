---
tags: [font]
---
# 为什么连续标点会挤压在一起？

如果字体与`text(lang: …, region: …)`不匹配，可能会导致连续标点被挤压。

例如字体不是中国大陆的却`#set text(lang: "zh", region: "CN")`，标点压缩会出错；反之亦然。
