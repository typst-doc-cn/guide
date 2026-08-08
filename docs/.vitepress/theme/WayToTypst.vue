<style>
/* Tab labels bar */
.tab-labels {
  @apply border-0 border-b-2 border-solid border-b-[var(--vp-c-border)];
  background: var(--vp-button-alt-bg);

  label {
    @apply cursor-pointer select-none;
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
  <div class="overflow-clip rounded-md shadow-md">
    <input type="radio" name="tabs" id="tab1" class="hidden" checked />
    <input type="radio" name="tabs" id="tab2" class="hidden" />
    <input type="radio" name="tabs" id="tab3" class="hidden" />
    <input type="radio" name="tabs" id="tab4" class="hidden" />
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
        <h4>
          <strong style="color: var(--vp-home-hero-name-color)">Typst</strong
          >是什么？<a href="https://typst.app">&#x2197;</a>
        </h4>
        <ul>
          <li><strong>网页办公应用</strong>，大陆可用</li>
          <li><strong>标记编程语言</strong>，新质排版</li>
          <li><strong>增量式编译器</strong>，所见所得</li>
        </ul>
        <p>
          <small style="font-size: 0.8em"
            >Typst = Markdown · LaTeX · Office</small
          >
        </p>
        <p>应用场景和边界：</p>
        <ul>
          <li>图书、报刊、发票等，追求速度的商业出版</li>
          <li>教材、论文、试卷等，大量数学公式的科技或教学</li>
          <li>笔记、简历、PPT等，可打印个人向、可套用模板向</li>
          <li>
            表格，装填数据、简单计算、绘图，是文档排版，而非Excel式的计算软件
          </li>
        </ul>
      </div>
      <div id="panel2">
        <ul>
          <li>
            以拉丁写作系统为先，覆盖了全球70%的范围，对于中东的右到左、东亚的表意文字和竖向，或需额外配置
          </li>
          <li>不支持动态内容，如音视频和3D模型</li>
          <li>HTML处于起步阶段，不随PDF一同编译，需专门编辑HTML部分</li>
        </ul>
        <hr />
        <ul>
          <li>开源可商用，Apache-2.0</li>
          <li>编译十倍速，比同行平均快十几倍</li>
          <li>即改即预览，修改后仅重新编译修改部分</li>
          <li>轻量便携式，小于0.1GB的单独免安装程序</li>
        </ul>
      </div>
      <div id="panel3">
        <ol>
          <li>
            <a href="https://gitee.com/mirrors/typst">一图认识</a
            >：见识Typst的编排能力，及代码、标记、数学三种模式的进出
          </li>
          <li>
            <a href="https://typst.app/docs/tutorial/writing-in-typst/"
              >四页入门</a
            >：可先跳读，只看代码和结果，忽略英文解释。会写学术会议文、可复用模板
          </li>
          <li>
            <a href="https://typst.app/docs/reference/syntax/">语言手册</a
            >：用哪个查哪个
          </li>
        </ol>
        <ul>
          <li>
            <a href="https://typst.app/universe/">三方生态</a
            >：社区人士制作的、被Typst官方收录的，包或模板（商用请注意第三方的许可协议）
          </li>
          <li>
            官网有<a href="https://typst.app/open-source/#download">程序下载</a
            >页面，但下载源都在<a href="https://github.com/typst/typst"
              >Github Typst 代码仓库</a
            >，好在有<a href="https://mirrors.cernet.edu.cn/app/Typst"
              >开源镜像站</a
            >，更快
          </li>
          <ul>
            <li>微软选Windows，苹果选macOS，其他Linux</li>
            <li>电脑选x86_64，手机平板选aarch64</li>
            <li>
              为减少上传下载的文件体积，默认都是压缩后的，请根据文件后缀名，先解压再启动
            </li>
          </ul>
        </ul>
      </div>
      <div id="panel4">
        <ul>
          <li>
            电脑操作：没用过命令行，无法启动？下载解压后的目录里右单击打开终端，输入
            <code>./typst compile main.typ out.pdf</code>
            添加到PATH后省略<code>./</code>
          </li>
          <li>
            基础知识：不了解em、pt、for、else这样的排版或编程概念？带关键词LaTeX或Python上网搜索
          </li>
          <li>函数、宏：查手册</li>
          <li>通用问题：问大语言模型，如DeepSeek、百度文心、需翻墙的ChatGPT</li>
          <li>中文排版：<a href="word.html">我是Word用户</a></li>
          <li>
            类似已解：见<a href="FAQ.html">常见问题</a>、搜<a
              href="https://forum.typst.app/"
              >英文论坛</a
            >和代码仓库
          </li>
          <li>报错信息：翻翻源码测试集</li>
        </ul>
      </div>
    </div>
  </div>
</template>
