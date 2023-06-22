<template>
  <a-radio-group v-model:value="tab" size="large" button-style="solid" class="absolute top-4 right-2 select-none z-10">
    <a-radio-button value="song">歌曲</a-radio-button>
    <a-radio-button value="bgm">BGM</a-radio-button>
    <a-radio-button value="others">其他</a-radio-button>
  </a-radio-group>
  <Song v-if="tab === 'song'"></Song>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Song from './Song.vue';
let tab = ref('song');
</script>