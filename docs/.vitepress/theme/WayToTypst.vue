<script setup lang="ts">
import { withBase } from 'vitepress';
</script>

<style>
/* Tab labels bar */
.tab-labels {
  @apply border-0 border-b-2 border-solid border-b-[var(--vp-c-border)];
  background: var(--vp-button-alt-bg);

  label {
    @apply cursor-pointer;
    color: var(--vp-c-text-2);
    transition: all 0.2s;

    &:hover {
      background: var(--vp-button-alt-hover-bg);
      color: var(--vp-c-text-1);
    }
  }

  /* Emphasize the active tab label */
  #tab1:checked ~ & label[for='tab1'],
  #tab2:checked ~ & label[for='tab2'],
  #tab3:checked ~ & label[for='tab3'],
  #tab4:checked ~ & label[for='tab4'] {
    @apply font-bold text-[var(--vp-c-brand)] shadow-inner;
    background: var(--vp-c-bg-alt);
  }

  /* The sliding bottom border */
  &::after {
    @apply content-empty relative bottom-0 left-0 -my-0.5 h-1 bg-[var(--vp-c-brand)] transition-all duration-200;
  }
  #tab2:checked ~ &::after {
    @apply left-1/1;
  }
  #tab3:checked ~ &::after {
    @apply left-2/1;
  }
  #tab4:checked ~ &::after {
    @apply left-3/1;
  }
  #tab1:focus-visible ~ &::after,
  #tab2:focus-visible ~ &::after,
  #tab3:focus-visible ~ &::after,
  #tab4:focus-visible ~ &::after {
    @apply -my-1 h-1.5 bg-[var(--vp-button-brand-bg)];
  }
}

/* Tab content panels */
.tab-panels {
  /* Hide inactive panels */
  & > div {
    display: none;
  }

  /* Show the active panel */
  #tab1:checked ~ & > #panel1,
  #tab2:checked ~ & > #panel2,
  #tab3:checked ~ & > #panel3,
  #tab4:checked ~ & > #panel4 {
    display: block;
    animation: fadeIn 0.3s ease;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<template>
  <div
    class="overflow-clip rounded-md shadow-md [&>input]:pointer-events-none [&>input]:absolute [&>input]:opacity-0"
  >
    <input type="radio" name="tabs" id="tab1" checked />
    <input type="radio" name="tabs" id="tab2" />
    <input type="radio" name="tabs" id="tab3" />
    <input type="radio" name="tabs" id="tab4" />
    <div
      class="tab-labels grid w-full grid-cols-4 [&>*]:grid [&>*]:size-full [&>*]:place-items-center [&>*]:py-3"
    >
      <label for="tab1">介绍</label>
      <label for="tab2">瑕瑜</label>
      <label for="tab3">学用</label>
      <label for="tab4">解惑</label>
    </div>
    <div class="tab-panels w-full [&>*]:px-6 [&>*]:pb-4">
      <div id="panel1">
        <p>
          <a href="https://typst.app/home" target="_blank" rel="noopener"
            >Typst</a
          >是什么？
        </p>
        <ul>
          <li>
            <strong>文档办公应用</strong>，网页
            <a href="https://typst.app/play" target="_blank" rel="noopener"
              >typst.app/play</a
            >
            可在线使用，下载编译器亦可<a
              :href="withBase('/quick-start.html#本地使用')"
              >本地使用</a
            >
          </li>
          <li>
            <strong>标记编程语言</strong
            >，轻松写作与精细排版两不误，综合Markdown、LaTeX所长
          </li>
          <li>
            <strong>增量式编译器</strong
            >，修改文档即刻预览，响应时间为毫秒级至秒级
          </li>
        </ul>
        <p>Typst能用在哪里？边界如何？</p>
        <ul>
          <li>图书、发票、小告示，追求高效自动与成本低廉的商业出版</li>
          <li>讲义、论文、试卷等，数学公式或交叉引用繁多的教育需求</li>
          <li>笔记、简历、幻灯片，能套用模板并个人定制的可打印文档</li>
          <li>
            读取数据、简单计算、绘图制表能融入文档排版，但并非Excel式计算软件
          </li>
        </ul>
      </div>
      <div id="panel2">
        <p>当前Typst的局限性：</p>
        <ul>
          <li>
            以拉丁书写系统为先，中文写作常需额外设置，例如<a
              :href="withBase('/FAQ/install-fonts.html')"
              >设置中文字体</a
            >
          </li>
          <li>
            不支持动态内容，难插入音视频和三维模型，幻灯片动画基本限于隐藏显示
          </li>
          <li>HTML导出处于起步阶段，往往不能随PDF一同导出，而要专门适配</li>
        </ul>
        <p>Typst的优势：</p>
        <ul>
          <li>官方文档集中统一</li>
          <li>增量编译响应迅速</li>
          <li>本地使用轻量便携</li>
          <li>源码开放商用自由</li>
        </ul>
      </div>
      <div id="panel3">
        <ol>
          <li>
            <a :href="withBase('/quick-start.html')">快速开始</a
            >：一图认识Typst的编排能力，熟悉标记、数学、脚本三种模式，然后选择在线或本地使用。
          </li>
          <li>
            <a
              href="https://typst.app/docs/tutorial/writing-in-typst/"
              target="_blank"
              rel="noopener"
              >四页入门</a
            >：可只看代码和结果，暂时忽略英文解释。理想情况下，读完就能撰写典型文章、开发简单模板了。
          </li>
          <li>
            其余文档：按需搜索查阅<a
              href="https://typst.app/docs/reference/"
              target="_blank"
              rel="noopener"
              >参考手册</a
            >和<a
              href="https://typst.app/docs/guides/"
              target="_blank"
              rel="noopener"
              >指南</a
            >，包含<a
              class="[.vp-doc_&]:not-hover:text-inherit"
              href="https://typst.app/docs/reference/syntax/"
              target="_blank"
              rel="noopener"
              >语法总览</a
            >、各种库函数的介绍、<a
              class="[.vp-doc_&]:not-hover:text-inherit"
              :href="withBase('/FAQ/input-symbol.html')"
              >符号列表</a
            >、<a
              class="[.vp-doc_&]:not-hover:text-inherit"
              href="https://typst.app/docs/guides/for-latex-users/"
              target="_blank"
              rel="noopener"
              >LaTeX用户指南</a
            >、<a
              class="[.vp-doc_&]:not-hover:text-inherit"
              href="https://typst.app/docs/guides/tables/"
              target="_blank"
              rel="noopener"
              >表格指南</a
            >等。
          </li>
        </ol>
        <p>
          如兴趣还可探索<a
            href="https://typst.app/universe/"
            target="_blank"
            rel="noopener"
            >官方宇宙 Typst Universe</a
          >。它列出了由社区人士制作且被Typst官方收录的包和模板，商用请注意第三方的许可协议。
        </p>
      </div>
      <div id="panel4">
        <ul>
          <li>
            电脑操作：没用过命令行，无法启动？不妨先尝试在线使用或本地Tinymist，详见上方「快速开始」
          </li>
          <li>
            基础知识：不了解em、pt等字体排印概念或for、else等编程概念？带关键词LaTeX或Python上网搜索，触类旁通
          </li>
          <li>通用问题：询问DeepSeek等大语言模型</li>
          <li>基础排版：见上方「我是Word用户」</li>
          <li>
            函数用法：查询官方文档、Typst Examples Book 或小蓝书，见下方「<a
              href="#推荐资料"
              >推荐资料</a
            >」
          </li>
          <li>
            类似已解：搜索上方「常见问题」或下方「<a href="#用户社区"
              >用户社区</a
            >」
          </li>
          <li>
            调试报错：询问连接了源代码仓库的
            <a
              href="https://deepwiki.com/typst/typst"
              target="_blank"
              rel="noopener"
              >DeepWiki</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
