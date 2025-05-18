# 发现

除了 [Typst 官方开发者](https://github.com/typst/) 外，社区也为丰富 Typst 生态作出了贡献。一些便捷的开发模块已经作为包（Package）陈列在 [Universe](https://typst.app/universe/) 中，大量的社区模板或收录在 [官方列表](https://github.com/typst/templates) 或分散在 GitHub 仓库，还有像 [Awesome Typst](https://github.com/qjcg/awesome-typst) 这样的精选列表致力于简要地概括社区的贡献。

但是，Universe 有复杂的 [筛选要求](https://github.com/typst/packages?tab=readme-ov-file#submission-guidelines)，而其他的陈列方式相对单薄，以仓库链接的形式嵌入 Web 中很难看出项目的具体功用。更为重要的是，一些开发中的项目没有一个地方来招募感兴趣的共同开发者，而一些已归档的项目也缺乏一个联系方式为后来的开发者提供参考，以及刚入群的群友很难分辨出哪位群友是哪个包/工具的开发者。

~~以 [非官方聊天群](https://qm.qq.com/q/MQO6j6jCw2) 为例，每时隔一段时间就有群友重新开发答题卡。~~

## 展示台

### 常设陈列位（成熟）

TODO：Tinymist, typst.ts, Typst-Preview, Typstyle, Touying, numbly, 中文社区导航，小蓝书，毕业论文模板全家桶……

### 流行新品（初步可用）

<GridView>
  <ShowyCard
    name="Garden / 社区项目发现平台"
    author="Ty*[] t;"
    authorLink="https://github.com/iscas-zac"
    :tags="['项目展示', '示例']"
    description="也就是本页面（garden.html）及其组件啦！"
    layout="grid"
    :links="['https://github.com/typst-doc-cn/guide/pull/2/']"
    homePage="/garden-help.md"
  />
</GridView>

### 合作招募（完善中）

### 归档（停止维护）

## 贡献须知

本页面欢迎贡献。具体方式请参考 [贡献须知](garden-help.md) 和源代码。


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