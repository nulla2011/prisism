<template>
  <div class="wrapper activate" :style="{ borderImageSource: `url('${border}')` }">
    <div class="flex h-[50px] items-center">
      <img :src="icon" class="mx-3">
      <span class="title" :style="{ color: token.colorText }">{{ song.songTitle }}</span>
    </div>
    <div class="flex-1 flex">
      <div class="description-box m-2.5 px-4 border border-solid rounded-xl flex flex-col"
        :style="{ backgroundColor: token.colorFill, borderColor: token.colorTextTertiary }">
        <div class="artist" :style="{ color: token.colorText }">{{ song.artist }}</div>
        <p class="description" :style="{ color: token.colorText }">{{ song.description }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();
const props = defineProps<{ song: Record<string, any>, border: string, icon: string }>();
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

.title {
  font-size: 24px;
}
</style>