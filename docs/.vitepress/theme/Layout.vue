<script setup lang="ts">
import { useData, useRoute, withBase } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { computed } from 'vue';
import { Waline } from '@waline/client/component';
import { makeTags } from './utils';
import '@waline/client/style';

const { Layout } = DefaultTheme;

const data = useData();

const serverURL = 'https://typst-waline.vercel.app/';
const path = computed(() => useRoute().path);
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
      <div class="flex gap-1 mb-2">
        <a
          v-for="tag in makeTags(data.frontmatter.value.tags)"
          class="simple-tag"
          :href="withBase(`/FAQ?tag=${tag}#outline`)"
        >
          {{ tag }}
        </a>
      </div>
    </template>
    <template #doc-after>
      <Waline :serverURL="serverURL" :path="path" />
    </template>
  </Layout>
</template>
