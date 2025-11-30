<script setup lang="ts">
import { useData, useRoute } from 'vitepress';
import { computed } from 'vue';
import { removePrefix } from '../util';
import { data, type Link, type RelativePath } from './see_also.data';

const route = useRoute();
const { site } = useData();

const links = computed<Link[] | null>(() => {
  const path: RelativePath = `/${removePrefix(route.path, site.value.base)}`;
  return data.linksIndex[path] ?? null;
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
