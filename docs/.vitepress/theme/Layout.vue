<script setup lang="ts">
import { useData, useRoute, withBase } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { computed } from 'vue';
import { Waline } from '@waline/client/component';
import { makeTags } from './utils';
import { getTypstVersion } from './typst_version'
import '@waline/client/style';

const { Layout } = DefaultTheme;

const data = useData();

const serverURL = 'https://typst-waline.vercel.app/';
const path = computed(() => useRoute().path);

const tags = computed(() => makeTags(data.frontmatter.value.tags));

const typstVersion = computed(() => {
  const lastUpdated = data.page.value.lastUpdated;
  // 新创建而未提交的页面，`lastUpdated`会为`null`
  if (lastUpdated !== null) {
    return getTypstVersion(new Date(lastUpdated!));
  }
  return null;
});
</script>

<style>
.wl-panel {
  margin: 16px 0 0;
}

[data-waline] {
  --waline-font-size: 18px;
}
</style>

<template>
  <Layout>
    <template #doc-before>
      <div class="vp-doc">
        <h1>{{ data.page.value.title }}</h1>
        <div
          v-if="tags.length > 0"
          class="flex gap-1 py-4"
          style="border-bottom: 1px solid var(--vp-c-divider)"
        >
          <a
            v-for="tag in tags"
            :href="withBase(`/FAQ?tag=${tag}#outline`)"
            class="simple-tag"
            style="text-decoration: none"
          >
            {{ tag }}
          </a>
        </div>
      </div>
    </template>
    <template #doc-footer-before>
      <!-- 与 <VPDocFooterLastUpdated> 并列 -->
      <p
        v-if="typstVersion !== null"
        class="text-align-right"
        style="font-size: 14px; font-weight: 500; color: var(--vp-c-text-2);"
      >更新时针对 typst {{ typstVersion.version }}<span v-if="typstVersion.latest">（最新版）</span></p>
    </template>
    <template #doc-after>
      <Waline :serverURL="serverURL" :path="path" />
    </template>
  </Layout>
</template>
