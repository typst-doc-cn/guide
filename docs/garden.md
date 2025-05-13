# 发现

除了 [Typst 官方开发者](https://github.com/typst/) 外，社区也为丰富 Typst 生态作出了贡献。一些便捷的开发模块已经作为包（Package）陈列在 [Universe](https://typst.app/universe/) 中，大量的社区模板或收录在 [官方列表](https://github.com/typst/templates) 或分散在 GitHub 仓库，还有像 [Awesome Typst](https://github.com/qjcg/awesome-typst) 这样的精选列表致力于简要地概括社区的贡献。

但是，Universe 有复杂的 [筛选要求](https://github.com/typst/packages?tab=readme-ov-file#submission-guidelines)，而其他的陈列方式相对单薄，以仓库链接的形式嵌入 Web 中很难看出项目的具体功用。更为重要的是，一些开发中的项目没有一个地方来招募感兴趣的共同开发者，而一些已归档的项目也缺乏一个联系方式为后来的开发者提供参考。

~~以 [非官方聊天群](https://qm.qq.com/q/MQO6j6jCw2) 为例，每时隔一段时间就有群友重新开发答题卡。~~

## 展示台

### 常设陈列位

### 流行新品

## 长期合作招募

## 归档

## 贡献须知

【这一板块后续可能会移动至单独页面】

本页面欢迎贡献。基础的贡献方式是直接在 GridView 中添加新卡片，卡片的条目见以下 demo。作者名包括但不限于非官方中文群昵称、qq 号、GitHub 用户名；封面上外链如果链接到 GitHub 仓库或者 Typst Universe 会自动显示八爪鱼或者蓝 t 图标。标签目前是预计描述使用场景，如果是包可以加入“包”标签，模板、扩展工具等都类似。注意这里不需要是完整的工具，也不需要有专门的主页（但是尽量提供一个获取方式），只要是群友围绕 Typst 做的项目，或者在群外发现对群友有帮助的都可以。

目前想的进阶玩法是可以用 Typst Export HTML 自定义一个卡片布局，也可以自定义一个主页然后托管在 typst-doc-cn，玩法参见以下主页测试。由于目前卡片和网格设计比较粗糙，也欢迎阅读卡片源代码并提 PR 改进。

### DEMO

  <GridView>
    <showy-card name="numbly" author="sign here" authorLink="https://github.com/flaribbit"
                :tags="['自动编号', '111']"
                :links="['https://github.com/flaribbit/numbly', 'https://typst.app/universe/package/numbly']"
    />
    <ShowyCard
      name="站内主页测试 (demo1.html)"
      author="测试员"
      homePage="/garden/demo1.html"
      description="这是一个链接到自定义 HTML 页面的卡片。"
      :tags="['html', '测试']"
      layout="grid"
    />
    <ShowyCard
      name="外部主页链接测试 (GitHub)"
      author="测试员"
      homePage="https://github.com"
      description="这是一个链接到 GitHub 的外部链接卡片。"
      :tags="['外部链接', '测试']"
      layout="grid"
    />
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

<script>
import ShowyCard from './ShowyCard.vue';
import GridView from './GridView.vue'

export default {
  components: {
    ShowyCard,
    GridView,
  }
}
</script>


<ShowyCard name="站内主页测试（demo.md)" author="Typst User" homePage="/garden/demo.md" description="A personal space to explore and share." :tags="['personal', 'notes']" layout="grid" />
