import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Typst 中文社区导航',
  base: '/guide/',
  ignoreDeadLinks: true,
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
  },
  themeConfig: {
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
        ]
      }
    ]
  }
})
