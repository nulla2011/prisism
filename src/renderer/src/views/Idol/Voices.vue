<template>
  <div class="header flex flex-row-reverse py-3">
    <el-button class="mr-6" type="primary" plain><span class="folder-button">打开目录</span></el-button>
  </div>
  <hr class="mx-4">
  <div class="voices grid grid-cols-2 gap-y-2 mt-4 mb-[4.5rem]">
    <audio :src="audiosrc" autoplay class="voice-audio"></audio>
    <div v-for="voice in list" :key="voiceKey(voice)" class="voice-warp flex items-center rounded-lg mx-3 h-12">
      <el-button :loading="isLoading[voiceKey(voice)]" circle class="mx-3" @click.stop.prevent="play(voice)">
        <template #icon>
          <el-icon size="25">
            <play-one theme="outline" size="40" fill="currentcolor" />
          </el-icon>
        </template>
      </el-button>
      <span class="title">{{ voice.title }}</span>
      <el-tooltip effect="light" :content="voice.voice" placement="bottom">
        <info theme="outline" size="25" class="info-icon ml-auto mr-3" />
      </el-tooltip>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { PlayOne, Info } from '@icon-park/vue-next';
import { voiceCharacter } from '@renderer/shared/constants/paths'
import useError from '@renderer/store/useError';
const store = useError();

const props = defineProps<{ list: Record<string, any>[] }>();
const voiceKey = (voice: Record<string, string>) => {
  return voice.voice || `duo_${voice.voiceId.substring(1, 7)}`
}
let booleanObj: Record<number, boolean> = {};
for (const el of props.list) {
  booleanObj[voiceKey(el)] = false;
}
let isLoading = reactive(booleanObj);
let audiosrc = ref('');
const charId = props.list[0].voiceId.substring(3, 6);
const play = (voice: Record<string, any>) => {
  const key = voiceKey(voice);
  console.log(key);
  isLoading[key] = true;
  if (voice.voice) {
    window.api.getAsset(voiceCharacter + charId + '/' + key + '.m4a').then((file) => {
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
    let path1 = voiceCharacter + char1 + `/mypage_talking_duo_${char1}${char2}0010010.m4a`;
    let path2 = voiceCharacter + char2 + `/mypage_talking_duo_${char1}${char2}0010020.m4a`;
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
  font-size: 18px;
}

.voices {
  overflow-y: auto;
}

hr {
  border-color: #9b949f;
}

.voice-warp {
  background-color: #f6f2f6;

  .title {
    font-family: HummingStd;
    color: var(--el-text-color-primary);
  }

  .info-icon {
    color: var(--el-text-color-primary);
  }
}
</style>