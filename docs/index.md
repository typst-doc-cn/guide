---
layout: home

title: Typst 中文社区导航
# titleTemplate: 由 Vite 和 Vue 驱动的静态站点生成器

hero:
  name: Typst
  text: 中文社区导航
  tagline: 排版原神，启动！
  actions:
    - theme: brand
      text: 快速开始
      link: /quick-start
    - theme: brand
      text: 常见问题
      link: /FAQ
    - theme: alt
      text: 我是 Word 用户
      link: /word
    - theme: alt
      text: 发现
      link: /garden
#     - theme: alt
#       text: GitHub
#       link: https://github.com/vuejs/vitepress
#   image:
#       src: /vitepress-logo-large.webp
#       alt: VitePress

# features:
#   - icon: 📝
#     title: 专注内容
#     details: 只需 Markdown 即可轻松创建美观的文档站点。
#   - icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 256 256.32"><defs><linearGradient id="a" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"/><stop offset="100%" stop-color="#BD34FE"/></linearGradient><linearGradient id="b" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"/><stop offset="8.333%" stop-color="#FFDD35"/><stop offset="100%" stop-color="#FFA800"/></linearGradient></defs><path fill="url(#a)" d="M255.153 37.938 134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"/><path fill="url(#b)" d="M185.432.063 96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028 72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"/></svg>
#     title: 享受 Vite 无可比拟的体验
#     details: 服务器即时启动，闪电般的热更新，还可以使用基于 Vite 生态的插件。
#   - icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 256 220.8"><path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z"/><path fill="#41B883" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z"/><path fill="#35495E" d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z"/></svg>
#     title: 使用 Vue 自定义
#     details: 直接在 Markdown 中使用 Vue 语法和组件，或者使用 Vue 组件构建自定义主题。
#   - icon: 🚀
#     title: 速度真的很快！
#     details: 采用静态 HTML 实现快速的页面初次加载，使用客户端路由实现快速的页面切换导航。
---

<!--- TODO
放一些 Typst 编译出的美图？
简单的 Typst 语法示例？
友链？
或者直接是“快速入门”的太长不看版？
--->

<style>
.tab-group {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;}
/* Hide radio inputs */
.tab-group input[type="radio"] {
  display: none;}
/* Tab labels bar */
.tab-labels {
  height: 50px;
  display: flex;
  background: #f0f0f0;
  border-bottom: 2px solid #ddd;}
.tab-labels label {
  flex: 1;
  padding: 14px 20px;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  transition: all 0.2s;
  user-select: none;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #ddd;}
.tab-labels label:hover {
  background: #e8e8e8;
  color: #333;}
/* Active tab label */
#tab1:checked ~ .tab-labels label[for="tab1"],
#tab2:checked ~ .tab-labels label[for="tab2"],
#tab3:checked ~ .tab-labels label[for="tab3"] {
  background: white;
  color: #007bff;
  border-bottom: 2px solid #007bff;
  margin-bottom: -2px;}
/* Fixed height container - KEY to preventing shaking */
.tab-panels {
  position: relative;
  height: 360px;
  overflow-y: scroll;
  scrollbar-gutter: stable;}
/* All panels occupy same space */
.tab-panel {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
  padding: 0px 24px;
  line-height: 1.6;}
/* Show active panel */
#tab1:checked ~ .tab-panels #panel1,
#tab2:checked ~ .tab-panels #panel2,
#tab3:checked ~ .tab-panels #panel3 {
  visibility: visible;
  opacity: 1;}
</style>

<div class="tab-group">
  <input type="radio" name="tabs" id="tab1" checked>
  <input type="radio" name="tabs" id="tab2">
  <input type="radio" name="tabs" id="tab3">
<div class="tab-labels">
  <label for="tab1">是什么，用在哪？</label>
  <label for="tab2">优缺点</label>
  <label for="tab3">学用、下载、疑问等</label>
</div>
<div class="tab-panels">
  <div class="tab-panel" id="panel1">
    <h4>Typst是什么？</h4>
    <ul>
      <li>支持多人在线合作编辑的免费<b>网页办公应用</b>，大陆地区可用</li>
      <li>排版文档的<b>标记编程语言</b>，比60秒就看懂的Markdown，只难一点儿</li>
      <li>从简单文本生成PDF/SVG/PNG/HTML的<b>增量式编译器</b>，对标LaTeX的质量、类似Office的所见即所得</li>
    </ul>
    <h4>应用场景：</h4>
    <ul>
      <li>图书、报刊、发票等，追求速度的商业出版</li>
      <li>教材、论文、试卷等，大量数学公式的科技或教学</li>
      <li>笔记、简历、PPT等，可打印个人向、可套用模板向的文档</li>
    </ul>
  </div>
  <div class="tab-panel" id="panel2">
    <h4>优点：</h4>
    <ul>
      <li>开源可商用，Apache-2.0</li>
      <li>编译十倍速，比同行平均快十几倍</li>
      <li>即改即预览，修改后仅重新编译修改部分</li>
      <li>轻量便携式，小于0.1GB的单独免安装程序</li>
    </ul>
    <h4>缺点：</h4>
    <ul>
      <li>以拉丁写作系统为先，覆盖了全球70%的范围，对于中东的右到左、东亚的表意文字和竖向，或需额外配置。</li>
      <li>不支持动态内容，如音视频和3D模型。虽PDF标准早已包含，但出于安全和实用目的，大部分PDF相关的软件都不支持。这就是说，即使生成了动态内容，用PDF阅读器打开，仍可能是静态的。</li>
      <li>HTML处于起步阶段，功能少，也并非同一篇Typst可生成PDF/HTML两种格式，需专门编辑HTML部分。</li>
    </ul>
  </div>
  <div class="tab-panel" id="panel3">
    <h4>Typst学用路径（英文原版）</h4>
    <ol>
      <li><a href="https://gitee.com/mirrors/typst">一图认识</a>：见识Typst的编排能力，及代码、标记、数学三种模式的进出</li>
      <li><a href="https://typst.app/docs/tutorial/writing-in-typst/">四页入门</a>：<b>别 看 英 文 旁 白</b>，只看代码和结果图就行。掌握用Typst作学术会议简报、可复用模板等</li>
      <li><a href="https://typst.app/docs/reference/syntax/">语言手册</a>：不建议背诵，用到再查</li>
    </ol>
    <ul><li><a href="https://typst.app/universe/">三方生态</a>：社区人士制作的、被Typst官方收录的，包或模板。（商用请注意第三方的许可协议）</li></ul>
    <h4>程序、文档、问题等：</h4>
    <ul>
      <li>程序<a href="https://typst.app/open-source/#download">下载页面</a>是在官网，但下载源都在<a href="https://github.com/typst/typst">Github Typst 代码仓库</a>，网络问题可用G站命令行工具<b>gh</b>，更快访问和下载。为减少上传下载的文件体积，默认都是压缩后的，要根据文件后缀名，先解压再启动；</li>
      <li>文档（包括教程、手册、LaTeX用户指南等）有PDF版本，方便离线查看，也在GitHub上，随新版本发布。没错，当然是100%Typst编译的！</li>
      <li>有问题？
        <ul>
          <li>函数与宏：其实任何问题，都推荐先看文档</li>
          <li>基础知识：不了解em、pt、for、else这样的排版或编程概念？带LaTeX或Python上网搜索</li>
          <li>通用问题：问大语言模型，如DeepSeek、百度文心、需翻墙的ChatGPT，为QQ群的一大补充</li>
          <li>类似已解：搜<a href="https://forum.typst.app/">英文社区</a>和代码仓库，看有无相关的</li>
          <li>报错源码：开发者可Git下载源码，翻翻测试集，看报错信息对应例子，甚至直接浏览Rust源码</li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</div>


## 推荐资料

中文社区资料：

- **🧭 本站**——导航、快速介绍、常见问题解答
- [**📘 小蓝书 The Raindrop-Blue Book**](https://typst-doc-cn.github.io/tutorial/)——入门教程
- [**📜 中文文档**](https://typst-doc-cn.github.io/docs/)——官方文档的非官方翻译
- [clreq-gap for typst](https://typst-doc-cn.github.io/clreq/)——分析 Typst 与中文排版的差距
- [可用于 Hayagriva 的 CSL 样式](https://typst-doc-cn.github.io/csl-sanitizer/)——让 Zotero 中文社区的参考文献样式能被 Typst 接受
- [CSL Validator](https://typst-doc-cn.github.io/csl-validator/)——克隆 CSL 官方检查器，适配中文 CSL 样式和大陆网络环境
- [泰普斯屯](https://typst-doc-cn.github.io/news/)——新闻信息汇总

其它资料：

- [**📜 官方文档 Typst Documentation**](https://typst.app/docs/)——教程、参考手册、指南（英文）
- [**🌌 官方宇宙 Typst Universe**](https://typst.app/universe)——浏览各种包、模板的平台（英文为主，个别页面有中文）
- [Typst Examples Book](https://sitandr.github.io/typst-examples-book/book/)——有非常多例子（英文）
- [Awesome Typst](https://github.com/qjcg/awesome-typst/)（英文为主，亦有中文专版）

## 问卷调查

为了解各位的使用情况，这里有一份问卷调查，感兴趣的用户可以填写一下：

- [关于 是否需要在 Word 中插入 typst 公式的功能的调研](https://wj.qq.com/s2/16829677/507f/)

## 用户社区

中文社区：

- 🐧 QQ：[**主群 793548390**](https://qm.qq.com/q/MQO6j6jCw2)、[聊天室 589034686](https://qm.qq.com/q/gYgU5vgbRK)、[开发群 833549182](https://qm.qq.com/q/FuRvQHGQU0)（点击链接加入）
- Telegram：[typst_zh](https://t.me/typst_zh)

官方社区（英文）：

- [**🙏 论坛**](https://forum.typst.app/)——讨论和问答平台，支持搜索过往解答
- [Discord](https://discord.gg/2uDybryKPe)——聊天及开发沟通平台，需要科学上网
- 其它平台见[官方文档 Community 页面](https://typst.app/docs/community/)

## 本站镜像

如果您本次访问缓慢，可尝试切换站点。

- 主站：[GitHub Pages](https://typst-doc-cn.github.io/guide/){data-no-mirror=true}
- 镜像站：[Cloudflare (guide.typst.dev)](https://guide.typst.dev)
- 镜像站：[Vercel (typst.dev/guide)](https://typst.dev/guide/)
- 测试站：[Netlify](https://luxury-mochi-9269a9.netlify.app/)

<!--
  另外，www.typst.dev 也是 Cloudflare，而 typst.dev 重定向到 Vercel。
  这俩太易混淆，就不写了。
-->
