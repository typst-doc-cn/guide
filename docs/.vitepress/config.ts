import footnote from 'markdown-it-footnote';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vitepress';

import { PROFILE } from './config_profile';
import { MarkdownTransform } from './plugins/markdown_transform';
import mirror_link from './plugins/mirror_link';
import TypstRender from './typst_render';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Typst 中文社区导航',
  base: ['cloudflare', 'netlify'].includes(PROFILE) ? '/' : '/guide/',
  lang: 'zh-CN',
  description:
    '本文档收录了日经问题（QQ 群中经常有人问的问题），以及官方文档和小蓝书中未提到的一些零碎的使用技巧。',
  ignoreDeadLinks: true,
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    config: (md) => {
      md.use(footnote);
      md.use(TypstRender);
      md.use(mirror_link);
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

    sidebar: {
      '/': [
        {
          items: [
            { text: '快速开始', link: '/quick-start' },
            { text: '常见问题', link: '/FAQ' },
            { text: '面向 Word 用户的快速入门向导', link: '/word' },
            { text: '其它示例', link: '/showcase' },
            { text: '发现', link: '/garden' },
          ],
        },
        {
          items: [
            { text: '参与指南', link: '/dev' },
            { text: '关于本站', link: '/about' },
          ],
        },
      ],
      '/dev/': [
        {
          items: [
            { text: '参与指南', link: '/dev' },
            { text: '渲染 Typst 代码块', link: '/dev/typst-render' },
            { text: 'FAQ 列表及标签', link: '/dev/faq-list' },
            { text: '“另请参见”链接', link: '/dev/see-also' },
            { text: '更新时针对的 Typst 版本', link: '/dev/typst-version' },
            { text: '镜像链接', link: '/dev/mirror-link' },
            { text: '如何升级 Typst 版本', link: '/dev/update' },
          ],
        },
        {
          items: [{ text: '关于本站', link: '/about' }],
        },
      ],
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2024-2025 typst guide team`,
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

  transformHead({ pageData: { isNotFound } }) {
    if (PROFILE === 'vercel' && isNotFound) {
      // 部署到 Vercel 时，将不带`.html`的 URL 在前端转到正确的 URL
      //
      // VitePress 文档建议给 Vercel 设置 cleanUrls。https://vitepress.dev/guide/routing#generating-clean-url
      // 然而不加这段代码时，无论如何设置 Vercel 的 cleanUrls，都不完全正常：
      // - 若关闭（默认），则
      //   - 不带`.html`的 URL 会返回 404 Not Found，内容是 404.html，然后 VitePress 会显示页面标题和“另请参见”，但不显示页面内容
      //   - 带`.html`的 URL 正常
      // - 若启用，则
      //   - 不带`.html`的 URL 正常
      //   - 带`.html`的 URL 会重定向到不带`.html`的 URL，但错误删除了 base（例：`/guide/foo.html` → `/foo`，而非`/guide/foo`）
      //
      // Vercel 以外的平台遇到缺少`.html`的 URL，均能正确返回相应文件，而非一律返回 404.html，故无此问题。
      return [
        [
          'script',
          // 需要等待 VitePress 的 assets/app.*.js 加载完再运行，故启用 ESM
          { type: 'module' },
          `
if (
  !window.location.pathname.endsWith("/") &&
  !window.location.pathname.endsWith(".html")
) {
  window.location.pathname += ".html";
}
`,
        ],
      ];
    }
  },

  vite: {
    plugins: [UnoCSS(), MarkdownTransform()],
  },
});
