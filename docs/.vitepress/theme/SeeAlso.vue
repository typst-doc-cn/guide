<script setup lang="ts">
import { useData, useRoute } from 'vitepress';
import { computed } from 'vue';
import { removePrefix } from '../util';
import { data, type Link, type RelativePath } from './see_also.data';

const route = useRoute();
const { site } = useData();

/**
 * Fix the path for Netlify.
 *
 * Netlify 部署 URL 比较奇怪：
 * - 若先访问 /FAQ.html，再单击跳转到 /FAQ/bib-etal-lang.html，则`path === "/FAQ/bib-etal-lang.html"`，正常。
 * - 若直接访问 /FAQ/bib-etal-lang.html，则`path === "/faq/bib-etal-lang.html"`，变成小写。
 */
function fixNetlify(path: RelativePath): RelativePath {
  return path.replace('/faq/', '/FAQ/') as RelativePath;
}

const links = computed<Link[] | null>(() => {
  const path: RelativePath = `/${removePrefix(route.path, site.value.base)}`;
  return data.linksIndex[path] ?? data.linksIndex[fixNetlify(path)] ?? null;
});
</script>
<template>
  <section v-if="links">
    <h2>另请参见</h2>
    <ul>
      <li v-for="{ url, title } in links">
        <a :href="url" target="_blank">{{ title }}</a>
      </li>
    </ul>
  </section>
</template>
