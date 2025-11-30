import { normalizePath, type Plugin } from 'vite';

/**
 * A Vite plugin that transforms append contents to markdown sources.
 *
 * Inspired by Zotero Chinese, licensed under MIT.
 * https://github.com/zotero-chinese/website/blob/138ce84ceb8f31b8457babe9119f8e3d35363ed7/src/.vitepress/plugins/markdownTransform.ts
 */
export function MarkdownTransform(): Plugin {
  return {
    name: 'zhtyp-guide-markdown-transform',
    enforce: 'pre',
    async transform(src: string, id: string): Promise<string | null> {
      const filepath: string = normalizePath(id);

      const faqPattern = /\/FAQ\/[^.]+\.md$/;
      if (!faqPattern.test(filepath)) {
        return null;
      }

      // There is no layout slot in VitePress's default theme that can add contents within `<main>`.
      // As a result, we have to transform the markdown source.
      src += `
<script setup>
import SeeAlso from "@theme/SeeAlso.vue"
</script>
<SeeAlso />
`;

      return src;
    },
  };
}
