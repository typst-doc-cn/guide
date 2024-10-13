<template>
  <div class="max-w-screen-lg w-full px-2 py-2 my-0 mx-auto">
    <div class="flex flex-wrap gap-1">
      <a
        :href="withBase(`FAQ#outline`)"
        class="simple-tag"
        style="text-decoration: none"
        @click="currentTag = null"
      >
        <span>全部</span>
        <span class="pl-1"> {{ data.posts.length }} </span>
      </a>
      <a
        v-for="(tag, i) in tags"
        :key="i"
        :href="withBase(`FAQ?tag=${tag}#outline`)"
        class="simple-tag"
        style="text-decoration: none"
        @click="currentTag = tag"
      >
        <span>{{ tag }}</span>
        <span class="pl-1"> {{ data.tagMap[tag].length }} </span>
      </a>
    </div>
    <div class="py-2 text-2xl">{{ currentTag }}</div>
    <div
      v-for="(article, index) in postList"
      :key="index"
      class="flex justify-between items-center gap-y-4"
    >
      <a
        :href="withBase(article.url)"
        class="overflow-hidden whitespace-nowrap text-ellipsis"
        style="text-decoration: none"
      >
        {{ article.title }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress';
import { ref, computed, onMounted } from 'vue';
import { data } from './faqlist.data';

const tags = Object.keys(data.tagMap);

const currentTag = ref<string | null>(null);

const postList = computed(() =>
  currentTag.value ? data.tagMap[currentTag.value] : data.posts
);

onMounted(() => updateCurrentTag());

const updateCurrentTag = () => {
  const searchParams = new URLSearchParams(window.location.search);
  currentTag.value = searchParams.get('tag');
};
</script>
