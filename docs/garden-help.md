# 贡献须知

基础的贡献方式是直接在 GridView 中添加新卡片，卡片的条目见以下 demo。作者名包括但不限于非官方中文群昵称、qq 号、GitHub 用户名；封面上外链如果链接到 GitHub 仓库或者 Typst Universe 会自动显示八爪鱼或者蓝 t 图标。标签目前是预计描述使用场景，如果是包可以加入“包”标签，模板、扩展工具等都类似。注意这里不需要是完整的工具，也不需要有专门的主页（但是尽量提供一个获取方式），只要是群友围绕 Typst 做的项目，或者在群外发现对群友有帮助的都可以。

目前想的进阶玩法是可以用 Typst Export HTML 自定义一个卡片布局，也可以自定义一个主页然后托管在 typst-doc-cn，玩法参见以下主页测试。由于目前卡片和网格设计比较粗糙，也欢迎阅读卡片源代码并提 PR 改进。

## DEMO（展示 ShowyCard 组件的使用方式）

### 在GridView中（默认）

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
  </GridView>

### 在 div 中

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
