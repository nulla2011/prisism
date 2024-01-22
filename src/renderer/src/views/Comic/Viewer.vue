<template>
  <button class="arrow-button arrow-prev" @click="handleClick(-1)"></button>
  <button class="arrow-button arrow-next" @click="handleClick(1)"></button>
  <section class="flex">
    <div class="info mx-8 mt-8 text-center text-2xl px-6" :style="{ color: token.colorText }">
      <p class="font-yuanti mt-3"> {{ `第${comic.chapter}话` }}</p>
      <p class="font-HumStd"> {{ comic.title }}</p>
      <hr class="my-3 border border-[#958e99] border-solid">
      <p class="font-yuanti">登场人物</p>
      <p class="font-HumStd" v-for="char in comic.comicCharacters">{{ char.name }}</p>
    </div>
    <div class="ml-4 h-screen flex-1 overflow-y-scroll">
      <img :src="useGetUrlHash(`${comicsPath}${comic.category}/page/`, comic.id, 'jpg', comic.hash)" />
    </div>
  </section>
</template>
<script setup lang="ts">
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { comics as comicsPath } from '@renderer/shared/constants/paths';
import useError from '@renderer/store/useError';
import { useRoute, useRouter } from 'vue-router';
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();
const store = useError();
const route = useRoute();
const router = useRouter();

const comics = await window.api.getComics().then((res) => res.comics.sort((a, b) => b.displayPriority - a.displayPriority)).catch((error) => {
  store.error = error.message;
});
const index = comics.findIndex((e) => e.id === route.params.id);
const comic = comics[index];
const handleClick = (delta: number) => {
  router.push({
    name: 'comicViewer',
    params: { id: comics[index + delta].id }
  });
}
</script>
<style lang="scss" scoped>
.info {
  width: 342px;
  height: 466px;
  background-image: url('@renderer/assets/image/comic_latest_version_base-mod.png');
}

p {
  margin-bottom: 0;
}

.arrow-button {
  position: absolute;
  width: 54px;
  height: 69px;
  top: calc(50vh - 69px / 2);
  z-index: 50;

  &.arrow-prev {
    background-image: url('@renderer/assets/image/arrow_prev.png');
    left: 380px;
  }

  &.arrow-next {
    background-image: url('@renderer/assets/image/arrow_next.png');
    left: 1150px;
  }
}
</style>