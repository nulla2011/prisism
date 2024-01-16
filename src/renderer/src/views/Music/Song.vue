<template>
  <div class="all-wrapper h-screen flex">
    <div class="section h-screen w-3/5 overflow-y-auto bg-white/50">
      <MusicSelector :list="concertBgms" @select-song="selectSong"></MusicSelector>
    </div>
    <div class="flex-1 flex flex-col relative">
      <div class="flex-1 flex justify-center items-center">
        <img v-if="selectedSongIndex > -1"
          :src="useGetUrlHash(musicJacketPath, concertBgms[selectedSongIndex]?.id, 'jpg', concertBgms[selectedSongIndex]?.hash)" />
      </div>
      <MusicPlayer :url="nowPlaying.audioUrl" :title="concertBgms[nowPlaying.index]?.songTitle"></MusicPlayer>
    </div>
  </div>
  <Error v-if="store.error">{{ store.error }}</Error>
</template>
<script setup lang="ts">
import { ref, provide, watchEffect, reactive } from "vue";
import MusicSelector from '@renderer/components/MusicSelector.vue';
import MusicPlayer from "@renderer/components/MusicPlayer.vue";
import useGetUrlHash from "@renderer/shared/composables/useGetUrlHash";
import { musicJacketPath } from "@renderer/shared/constants/paths";
import useError from '@renderer/store/useError';
const store = useError();

const selectedSongIndex = ref(-1);
const nowPlaying = reactive({ index: -1, audioUrl: '' });
provide('now-playing', nowPlaying);
const concertBgms = await window.api.getConcertBgms().then((data) => data.concertBgms).catch((error) => {
  store.error = error.message;
});
const selectSong = (index: number) => {
  selectedSongIndex.value = index;
}
</script>
<style lang="scss" scoped>
.all-wrapper {
  background-image: url('@renderer/assets/image/images-bg-016.jpg');
  background-size: cover;
}

.section::-webkit-scrollbar {
  display: none;
}
</style>