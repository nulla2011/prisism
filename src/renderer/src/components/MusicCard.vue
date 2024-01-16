<template>
  <div class="wrapper activate" :style="{ borderImageSource: `url('${border}')` }">
    <div class="flex h-[50px] items-center">
      <slot></slot>
    </div>
    <div class="flex-1 flex">
      <div class="description-box m-2.5 px-4 border border-solid rounded-xl flex flex-col"
        :style="{ backgroundColor: token.colorFill, borderColor: token.colorTextTertiary }">
        <div class="artist" :style="{ color: token.colorText }">{{ song.artist }}</div>
        <p class="description" :style="{ color: token.colorText }">{{ song.description }}</p>
      </div>
      <a-config-provider :theme="{ token: { colorPrimary: '#6fceeb' } }">
        <a-button size="large" shape="circle" type="primary" :loading="isLoading" class="mx-3 h-12 w-12"
          @click.stop.prevent="play">
          <template #icon>
            <play-one theme="outline" size="32" fill="currentcolor" />
          </template>
        </a-button>
      </a-config-provider>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, inject } from 'vue';
import { PlayOne } from '@icon-park/vue-next';
import { concertMusicPath } from '@renderer/shared/constants/paths';
import { theme } from 'ant-design-vue';
import useError from '@renderer/store/useError';
const store = useError();
const { useToken } = theme;
const { token } = useToken();
const props = defineProps<{ song: Record<string, any>, border: string, index: number }>();

const playingIndex = inject<{
  index: number;
  audioUrl: string;
}>('now-playing')!;
const isLoading = ref(false);
const play = () => {
  isLoading.value = true;
  window.api.getAsset(concertMusicPath + props.song.id + '.m4a', props.song.hash).then((file) => {
    const blob = new Blob([file], { type: 'video/mp4' });
    playingIndex.audioUrl = URL.createObjectURL(blob);
    playingIndex.index = props.index;
    isLoading.value = false;
  }).catch((error) => {
    store.error = error.message;
  });
}
</script>
<style lang="scss" scoped>
.activate {
  height: 260px;
  width: 705px;
  display: flex;
  flex-direction: column;
  animation: 0.2s ease-in 0s enter;

  .description-box {
    height: 170px;
    width: 588px;

    .artist {
      height: 42px;
      line-height: 42px;
      font-size: 18px;
    }

    .description {
      margin-top: 2px;
      font-size: 15px;
      white-space: pre-line;
      line-height: 20px;
    }
  }
}

@keyframes enter {
  from {
    transform: scale(0);
  }
}
</style>