<template>
  <div
    class="absolute mx-auto left-0 right-0 bottom-12 w-[500px] h-20 rounded-lg bg-transparent border-solid border-2 border-[#c0c0c0c0] p-1.5">
    <audio ref="audioPlayer" :src="url" autoplay></audio>
    <div class="flex items-center w-full h-full bg-[#4e4e4ea0] rounded-lg backdrop-blur-sm">
      <button class="mx-2 cursor-pointer" @click="playOrPause">
        <pause-one v-if="isPlaying" theme="outline" size="45" fill="#eee"></pause-one>
        <play v-else theme="outline" size="45" fill="#eee"></play>
      </button>
      <div class="flex-1 h-full">
        <div class="h-8 font-HumStd px-3 leading-8 text-[#f5f5f5]">{{ title }}</div>
        <div class="w-full relative top-[-0.4rem] flex">
          <a-slider class="flex-1" :max="duration" v-model:value="currentTime" :tooltipOpen="false"
            @change="positionChange"></a-slider>
          <span class="mx-2 text-[#f5f5f5] leading-8"><span>{{ formatTime(currentTime) }}</span>/<span>{{
            formatTime(duration)
          }}</span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Play, PauseOne } from '@icon-park/vue-next';
import { onMounted, ref, watch } from 'vue';
const props = defineProps<{ url: string, title: string }>();

let audioPlayer = ref<HTMLMediaElement | null>();
let isPlaying = ref(false);
let duration = ref(0);
let currentTime = ref(0);
watch(() => props.url, () => {
  isPlaying.value = true;
  duration.value = Math.floor(audioPlayer.value!.duration);
});
onMounted(() => {
  audioPlayer.value!.onended = () => isPlaying.value = false;
  audioPlayer.value!.ontimeupdate = () => currentTime.value = Math.floor(audioPlayer.value!.currentTime);
  audioPlayer.value!.ondurationchange = () => duration.value = Math.floor(audioPlayer.value!.duration);
});
const playOrPause = () => {
  if (isPlaying.value) {
    audioPlayer.value?.pause();
  } else {
    audioPlayer.value?.play();
  }
  isPlaying.value = !isPlaying.value;
};
const positionChange = () => audioPlayer.value!.currentTime = currentTime.value;
const formatTime = (time: number) => `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`;
</script>
<style lang="scss" scoped></style>