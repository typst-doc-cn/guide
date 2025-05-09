---
tags: [word]
---

# 如何转换成 word？

相关问题：学校要求交 word 文档（docx）怎么办？

先说结论，完美转换是不可能的，你可以根据实际情况选择优先保证 **可编辑性** 还是 **格式正确性**。

## 可编辑性

此类方法转换得到的文档排版会有不同程度的变化，你可以转换后再手动修改使其符合要求。

### typst 转 docx

使用 [pandoc](https://pandoc.org/) 可以把 typst 代码转换成 `docx`，并保留标题、列表、段落、字体等样式信息。

### pdf 转 docx

也可以把 typst 编译生成的 pdf 转换成 docx，以下常见的软件/工具可以实现：

- Word：新版本的 Word 可以直接打开 pdf 文件并转换成 docx。
- [smallpdf](https://smallpdf.com/)：免费网站
- [ilovepdf](https://www.ilovepdf.com/)：免费网站
- [PDFGear](https://www.pdfgear.com/)：免费软件
- PDF-XChange Editor：收费软件
- WPS：此功能收费
- [Adobe Acrobat](https://www.adobe.com/acrobat.html)：收费软件

这些工具转换不同文档时效果有好有坏，很难说哪个效果一定好，你可以自己测试一下。

## 格式正确性

前面的方法得到的 docx 或多或少都会有排版/格式问题，要保证格式正确性只有一个方法，那就是转成图片。
- WPS 可以一键把 pdf 转成图片的 Word，但貌似是收费的。
- 如果你购买了 Adobe Acrobat，选择 导出 PDF > Microsoft Word-Word文档 > 齿轮图标 > 版面设置 > 保留页面布局，确认导出即可。但是这种方法并不是 100% 靠谱。
- 如果你购买了 Adobe Acrobat，更靠谱的方法是，选择 导出 PDF > 图像-PDF > 齿轮图标，分辨率至少选择 111.81 像素/厘米（其实就是 300 dpi），确认导出。启动 Word，新建文档，将页边距设为 0，然后导入刚刚导出的图像即可。
- 如果你购买了 PDF-XChange Editor，选择 转换 > 栅格化页面，确认分辨率是否为 300dpi 以上，确定，然后点击 到 MS-Word 即可。
