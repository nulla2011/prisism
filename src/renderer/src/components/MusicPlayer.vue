<template>
  <div
    class="absolute mx-auto left-0 right-0 bottom-12 w-[500px] h-20 rounded-lg bg-transparent border-solid border-2 border-[#c0c0c0c0] p-1.5">
    <audio ref="audioPlayer" :src="url" autoplay></audio>
    <div class="flex items-center w-full h-full bg-[#6b6b6b83] rounded-lg backdrop-blur-md">
      <button class="mx-2 cursor-pointer" @click="playOrPause">
        <pause-one v-if="isPlaying" theme="outline" size="45" fill="#eee"></pause-one>
        <play v-else theme="outline" size="45" fill="#eee"></play>
      </button>
      <div class="flex-1 h-full">
        <div class="h-8 font-HumStd px-3 leading-8 text-[#f5f5f5]">{{ title }}</div>
        <div class="w-full relative top-[-0.4rem] flex">
          <a-config-provider :theme="{
            token: {
              colorFillSecondary: '#f5f5f5a0',
              colorFillTertiary: '#f5f5f5c0',
            },
          }">
            <a-slider class="flex-1" :max="duration" v-model:value="currentTime" :tooltipOpen="false"
              @change="positionChange"></a-slider>
          </a-config-provider>
          <span class="mx-2 text-[#f5f5f5] leading-8">
            <span>{{ formatTime(currentTime) }}</span>/<span>{{ formatTime(duration) }}</span>
          </span>
        </div>
      </div>
      <button @click="mute" class="ml-1 mr-2">
        <volume-mute v-if="isMute" theme="outline" size="22" fill="#eee"></volume-mute>
        <volume-notice v-else theme="outline" size="22" fill="#eee"></volume-notice>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Play, PauseOne, VolumeNotice, VolumeMute } from '@icon-park/vue-next';
import { onMounted, ref, watch } from 'vue';
const props = defineProps<{ url: string, title: string }>();

const audioPlayer = ref<HTMLMediaElement | null>();
const isPlaying = ref(false);
const duration = ref(0);
const currentTime = ref(0);
const isMute = ref(false);
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
    isPlaying.value = false;
  } else {
    audioPlayer.value?.play();
    isPlaying.value = true;
  }
};
const positionChange = () => audioPlayer.value!.currentTime = currentTime.value;
const formatTime = (time: number) => `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`;
const mute = () => {
  if (audioPlayer.value) {
    if (isMute.value) {
      audioPlayer.value.volume = 1;
      isMute.value = false;
    } else {
      audioPlayer.value.volume = 0;
      isMute.value = true;
    }
  }

}
</script>