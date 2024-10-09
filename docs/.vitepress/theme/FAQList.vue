<script setup>
import { data } from './faqlist.data.js'
import { useData } from 'vitepress'
const basepath = useData().site.value.base
console.log(data)
</script>

<template>
  <ul>
    <li v-for="item in data" :key="item.path">
      <a :href="basepath + item.path">{{ item.title }}</a>
    </li>
  </ul>
</template>
