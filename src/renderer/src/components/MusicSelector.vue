<template>
  <template v-for="(song, index) in list">
    <div v-if="index === activate"></div>
    <div v-else>{{ song.songTitle }}</div>
  </template>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ list: Record<string, any>[] }>();
let activate = ref<number>(-1);
</script>