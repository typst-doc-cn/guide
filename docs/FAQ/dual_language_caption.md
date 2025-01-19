---
tags: [figure, show]
---

# figure 的 caption 如何实现双语？

我个人推荐封装一个myfig(body, zhcaption, encaption)

然后调用figure(body, kind: 'myfig', caption: metadata((.......zhcaption......encaption)))

然后show figure.where(kind: 'myfig')从metadata里把双语拿出来

```typst
等人来写（）
```
