import { defineConfig } from 'vitepress';
import UnoCSS from 'unocss/vite';
import TypstRender from './typst_render';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Typst 中文社区导航',
  base: '/guide/',
  lang: 'zh-CN',
  description: '本文档收录了日经问题（QQ 群中经常有人问的问题），以及官方文档和小蓝书中未提到的一些零碎的使用技巧。',
  ignoreDeadLinks: true,
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    config: (md) => {
      md.use(TypstRender);
    },
  },
  head: [
    [
      'script',
      {},
      `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "o5fc884imi");`,
    ],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-NL1RYQ4PW7',
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-NL1RYQ4PW7');`,
    ],
  ],
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/typst-doc-cn/guide/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/typst-doc-cn/guide' },
    ],
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            processTerm: (term) => {
              // @ts-ignore
              const segmenter =
                Intl.Segmenter &&
                new Intl.Segmenter('zh', { granularity: 'word' });
              if (!segmenter) return term;
              const tokens: string[] = [];
              for (const seg of segmenter.segment(term)) {
                tokens.push(seg.segment);
              }
              return tokens;
            },
          },
        },
      },
    },
    sidebar: [
      {
        items: [
          { text: '快速开始', link: '/quick-start' },
          { text: '常见问题', link: '/FAQ' },
          { text: '面向 Word 用户的快速入门向导', link: '/word' },
          { text: '其他示例', link: '/showcase' },
          { text: '关于本站', link: '/about' },
        ],
      },
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2024 typst guide team`,
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '目录',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },

  vite: {
    plugins: [UnoCSS()],
  },
});
