<template>
  <div class="h-screen flex">
    <div class="h-screen w-3/5">
      <MusicSelector :list="concertBgms"></MusicSelector>
    </div>
    <div class="flex-1">

    </div>
  </div>
  <Error v-if="store.error">{{ store.error }}</Error>
</template>
<script setup lang="ts">
import MusicSelector from '@renderer/components/MusicSelector.vue';
import useError from '@renderer/store/useError';
const store = useError();

let concertBgms = await window.api.getConcertBgms().catch((error) => {
  store.error = error.message;
}); 
</script>