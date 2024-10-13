import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import FAQList from './FAQList.vue';
import './custom.css';
import 'virtual:uno.css';

export default {
  extends: DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: Layout,
  enhanceApp({ app }) {
    // register your custom global components
    app.component('FAQList', FAQList);
  },
} satisfies Theme;
