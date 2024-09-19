import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Typst 中文社区导航',
  base: '/guide/',
  lang: 'zh-CN',
  ignoreDeadLinks: true,
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
  },
  head: [
    ['script', {}, `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "o5fc884imi");`],
  ],
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/typst-doc-cn/guide/edit/master/docs/:path'
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
              const segmenter = Intl.Segmenter && new Intl.Segmenter("zh", { granularity: "word" });
              if (!segmenter) return term;
              const tokens: string[] = [];
              for (const seg of segmenter.segment(term)) {
                tokens.push(seg.segment);
              }
              return tokens;
            },
          }
        }
      }
    },
    sidebar: [
      {
        items: [
          { text: '快速开始', link: '/quick-start' },
          { text: '常见问题', link: '/FAQ' },
          { text: '面向 Word 用户的快速入门向导', link: '/word' },
          { text: '其他示例', link: '/showcase' },
        ]
      }
    ]
  }
})
