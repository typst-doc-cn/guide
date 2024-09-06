<script setup>
import DefaultTheme from 'vitepress/theme'
import { Waline } from '@waline/client/component'
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import '@waline/client/style'

const { Layout } = DefaultTheme
const serverURL = "https://typst-waline.vercel.app/"
const path = computed(() => useRoute().path)
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
    <template #doc-after>
      <Waline :serverURL="serverURL" :path="path" />
    </template>
  </Layout>
</template>
