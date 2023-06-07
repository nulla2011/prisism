<template>
  <div class="all-wrapper h-screen flex">
    <div class="h-screen w-3/5 overflow-y-auto bg-white/50">
      <MusicSelector :list="concertBgms" @select-song="selectSong"></MusicSelector>
    </div>
    <div class="flex-1 flex">
      <div class="flex-1 flex justify-center items-center">
        <img v-if="selectedSongIndex > -1"
          :src="useGetUrlHash(musicJacketPath, concertBgms[selectedSongIndex]?.id, 'jpg', concertBgms[selectedSongIndex]?.hash)" />
      </div>
    </div>
  </div>
  <Error v-if="store.error">{{ store.error }}</Error>
</template>
<script setup lang="ts">
import { ref } from "vue";
import MusicSelector from '@renderer/components/MusicSelector.vue';
import useGetUrlHash from "@renderer/shared/composables/useGetUrlHash";
import { musicJacketPath } from "@renderer/shared/constants/paths";
import useError from '@renderer/store/useError';
const store = useError();

let selectedSongIndex = ref(-1);
let concertBgms = await window.api.getConcertBgms().catch((error) => {
  store.error = error.message;
});
let selectSong = (index: number) => {
  selectedSongIndex.value = index;
}
</script>
<style lang="scss" scoped>
.all-wrapper {
  background-image: url('@renderer/assets/image/images-bg-016.jpg');
  background-size: cover;
}
</style>