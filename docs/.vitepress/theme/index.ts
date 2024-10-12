import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import FAQList from './FAQList.vue'

export default {
  extends: DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: Layout,
  enhanceApp({ app }) {
    // register your custom global components
    app.component('FAQList', FAQList)
  }
}