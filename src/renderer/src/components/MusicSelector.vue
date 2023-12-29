<template>
  <template v-for="(song, index) in list">
    <MusicCard v-if="index === active" :song="song" :border="getBorderImg(song)" :index="index">
      <img :src="getIcon(song)" class="mx-3">
      <span class="title" :style="{ color: token.colorText }">{{ song.songTitle }}</span>
    </MusicCard>
    <div v-else class="wrapper unactivate" :style="{ borderImageSource: `url('${getBorderImg(song)}')` }"
      @click="changeSong(index)">
      <img :src="getIcon(song)" class="mx-3">
      <span class="title" :style="{ color: token.colorText }">{{ song.songTitle }}</span>
    </div>
  </template>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import MusicCard from '@renderer/components/MusicCard.vue';
import { unitIconPath, musicIconPath, musicBasePath } from '@renderer/shared/constants/paths';
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();

const props = defineProps<{ list: Record<string, any>[] }>();
const emits = defineEmits(['selectSong']);
let active = ref<number>(-1);
const getBorderImg = (song: Record<string, string>) => {
  const url = `http://localhost:${import.meta.env.RENDERER_VITE_PORT}/assets/${musicBasePath}`;
  if (song.baseImage) {
    return url + song.baseImage + '.png';
  } else {
    return url + 'select_music_base_' + song.unitId + '.png';
  }
}
const getIcon = (song: Record<string, string>) => {
  if (song.iconImage) {
    return useGetUrlHash(musicIconPath, song.iconImage, 'png');
  } else if (song.unitId === '0') {
    return useGetUrlHash(musicIconPath, 'unit_icon_0', 'png');
  } else {
    return useGetUrlHash(unitIconPath, song.unitId.padStart(3, '0'), 'png');
  }
}
const changeSong = (index: number) => {
  active.value = index;
  emits('selectSong', index);
}
</script>
<style lang="scss" scoped>
.wrapper {
  margin: 12px auto;
  border: 10px solid;
  border-image-outset: 0;
  border-image-width: 1 1 1 1;
  border-image-slice: 10 10 10 10 fill;
  font-family: HummingStd;
}

.unactivate {
  height: 70px;
  width: 660px;
  display: flex;
  align-items: center;
}

.title {
  font-size: 24px;
}
</style>