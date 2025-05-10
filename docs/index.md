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
    - theme: alt
      text: 常见问题
      link: /FAQ
    - theme: alt
      text: 我是 Word 用户
      link: /word
    - theme: alt
      text: 发现
      link: /gym
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

## 推荐资料

小蓝书 Web 版（入门必读！）：https://typst-doc-cn.github.io/tutorial/

中文 Awesome Typst 列表：https://github.com/qjcg/awesome-typst/

Typst 非官方中文文档网站：https://typst-doc-cn.github.io/docs/

中文用户使用 Typst 常见问题：https://typst-doc-cn.github.io/docs/chinese/

## 问卷调查

为了解各位的使用情况，这里有两份问卷调查，感兴趣的用户可以填写一下：

- [Typst 非官方中文社群年度问卷（2024）](https://www.wjx.cn/vm/Q43WAhW.aspx)
- [关于 是否需要在Word中插入typst公式的功能 的调研](https://wj.qq.com/s2/16829677/507f/)

## 用户社区

中文聊天群：793548390 [点击此处加入](https://qm.qq.com/q/MQO6j6jCw2)

官方 Discord：https://discord.gg/2uDybryKPe

小蓝书 Web 版：https://typst-doc-cn.github.io/guide/


  <div class="grid-container">
    <showy-card name="numbly" author="sign here" authorLink="https://github.com/flaribbit"
                :tags="['自动编号', '111']"
                :links="['https://github.com/flaribbit/numbly', 'https://typst.app/universe/package/numbly']"
    />
    <showy-card name="typst-live" author="Typst Team" 
                description="实时预览Typst文档"
                :tags="['实时预览', '编辑器']"
                :links="['https://github.com/typst/typst-live']"
    />
    <showy-card name="typst-vscode" author="Typst Team"
                description="VSCode的Typst插件"
                :tags="['VSCode', '插件']"
                :links="['https://github.com/typst/vscode-typst']"
    />
  </div>

  <div style="margin-top: 20px;">
    <h2>宝可梦卡片示例</h2>
    <CommonPokemonCard :card="pokemon" />
  </div>

  <GridView>
    <ShowyCard
      name="卡片1 (在GridView中)"
      author="示例作者"
      :tags="['网格布局', '测试']"
      description="这是在 GridView 中的第一个卡片。"
      layout="grid"
    />
    <ShowyCard
      name="卡片2 (在GridView中)"
      author="示例作者"
      :tags="['Vue', '组件']"
      description="这是在 GridView 中的第二个卡片，用于演示统一尺寸排列。"
      layout="grid"
    />
    <ShowyCard
      name="卡片3 (在GridView中)"
      author="示例作者"
      :tags="['演示', '布局']"
      description="这是在 GridView 中的第三个卡片。"
      layout="grid"
    />
  </GridView>

  <div>
    <ShowyCard
      name="自定义卡片示例"
      author="Trae AI"
      authorLink="https://example.com"
      :tags="['Vue', 'Slot']"
      description="这是一个通过插槽自定义内容的卡片。"
      layout="grid"
    >
      <div style="padding: 1em; text-align: center;">
        <h2>这是一个自定义的标题</h2>
        <p>这里可以放任何 HTML 内容，比如一张图片：</p>
        <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
      </div>
    </ShowyCard>  
    <ShowyCard
      name="默认卡片示例"
      author="Trae AI"
      authorLink="https://example.com"
      :tags="['Vue', 'Default']"
      description="这是一个使用默认布局的卡片。"
      layout="grid"
    />
  </div>

  <div style="margin-top: 20px;">
    <h2>宝可梦卡片示例</h2>
    <CommonPokemonCard :card="pokemon" />
  </div>

<script>
import ShowyCard from './ShowyCard.vue';
import CommonPokemonCard from './CommonPokemonCard.vue';
import pokemonData from './data/pokemon-data.json';
import GridView from './GridView.vue'

export default {
  data() {
    return {
      pokemon: pokemonData.commonCard // Or anotherCommonCard, or pass dynamically
    };
  },
  components: {
    ShowyCard,
    GridView,
    CommonPokemonCard
  }
}
</script>