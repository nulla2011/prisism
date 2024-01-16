<template>
  <div class="header flex flex-row-reverse py-3">
    <a-button class="mr-6" type="primary"><span class="folder-button">打开目录</span></a-button>
  </div>
  <hr class="mx-4" />
  <div class="voices grid grid-cols-2 gap-y-2 mt-4 mb-[4.5rem]">
    <audio :src="audiosrc" autoplay class="voice-audio"></audio>
    <div v-for="voice in list" :key="voiceKey(voice)" class="voice-warp flex items-center rounded-lg mx-3 h-12">
      <a-button shape="circle" :loading="isLoading[voiceKey(voice)]" class="mx-3" @click.stop.prevent="play(voice)">
        <template #icon>
          <play-one theme="outline" size="22" fill="currentcolor" />
        </template>
      </a-button>
      <span class="title" :style="{ color: token.colorText }">{{ voice.title }}</span>
      <a-tooltip :title="voice.voice" placement="bottom" :getPopupContainer="(triggerNode) => triggerNode.parentNode">
        <info theme="outline" size="25" class="ml-auto mr-3" :style="{ color: token.colorTextSecondary }" />
      </a-tooltip>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { PlayOne, Info } from '@icon-park/vue-next';
import { voiceCharacterPath } from '@renderer/shared/constants/paths'
import useError from '@renderer/store/useError';
const store = useError();
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();

const props = defineProps<{ list: Record<string, any>[] }>();
const voiceKey = (voice: Record<string, string>) => {
  return voice.voice || `duo_${voice.voiceId.substring(1, 7)}`
}
const booleanObj: Record<number, boolean> = {};
for (const el of props.list) {
  booleanObj[voiceKey(el)] = false;
}
const isLoading = reactive(booleanObj);
const audiosrc = ref('');
const charId = props.list[0].voiceId.substring(3, 6);
const play = (voice: Record<string, any>) => {
  const key = voiceKey(voice);
  isLoading[key] = true;
  if (voice.voice) {
    window.api.getAsset(voiceCharacterPath + charId + '/' + key + '.m4a').then((file) => {
      isLoading[key] = false;
      const blob = new Blob([file], { type: 'video/mp4' });
      audiosrc.value = URL.createObjectURL(blob);
      // let audio = new Audio(URL.createObjectURL(blob));
      // audio.play();
    }).catch((err) => {
      store.error = err.message;
    });
  } else {
    const char1 = voice.voiceId.substring(1, 4);
    const char2 = voice.voiceId.substring(4, 7);
    let url1 = '';
    let url2 = '';
    const path1 = voiceCharacterPath + char1 + `/mypage_talking_duo_${char1}${char2}0010010.m4a`;
    const path2 = voiceCharacterPath + char2 + `/mypage_talking_duo_${char1}${char2}0010020.m4a`;
    Promise.all([
      window.api.getAsset(path1).then((file) => {
        const blob = new Blob([file], { type: 'video/mp4' });
        url1 = URL.createObjectURL(blob);
      }),
      window.api.getAsset(path2).then((file) => {
        const blob = new Blob([file], { type: 'video/mp4' });
        url2 = URL.createObjectURL(blob);
      }),
    ]).then(() => {
      isLoading[key] = false;
      audiosrc.value = url1;
      document.querySelector('.voice-audio')?.addEventListener('ended', () => {
        if (audiosrc.value == url1) {
          setTimeout(() => audiosrc.value = url2, 500);
        }
      })
    }).catch((err) => {
      store.error = err.message;
    });
  }
}
</script>
<style lang="scss" scoped>
.folder-button {
  font-family: yuanti;
  font-size: 15px;
}

hr {
  border-top: 2px solid #9b949f;
}

.voice-warp {
  background-color: #f6f2f6;

  .title {
    font-family: HummingStd;
    font-size: 18px;
  }

}
</style>