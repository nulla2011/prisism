<template>
  <a-layout class="bg-transparent">
    <a-layout-header class="flex items-center pl-0 pr-5 bg-transparent">
      <Title title="四格漫画" lang="zh" />
    </a-layout-header>
    <a-layout-content class="pt-4 px-24">
      <section class="w-full h-[600px] px-5 bg-white border-2 border-solid rounded-xl border-[#958e99]">
        <div class="mt-12 mb-24 grid grid-cols-4 gap-y-12">
          <div v-for="comic in currentList" class="comic" :key="comic.id">
            <router-link :to="{ name: 'comic', params: { id: comic.id } }">
              <div class="pt-1 pb-[3px] text-center font-yuanti text-white text-base">{{ `第${comic.chapter}话` }}</div>
              <img width="183" class="ml-[3px]"
                :src="useGetUrlHash(`${comicsPath}${comic.category}/icon/`, comic.id, 'jpg', comic.hash)" />
            </router-link>
          </div>
        </div>
        <a-pagination class="text-center" v-model:current="current" :total="data.comics.length" :showSizeChanger="false"
          :pageSize="8" show-quick-jumper />
      </section>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import Title from '@renderer/components/Title.vue';
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { comics as comicsPath } from '@renderer/shared/constants/paths';
import useError from '@renderer/store/useError';
const store = useError();

const current = ref(1);
const currentList = ref<Record<string, any>[]>([]);
const data = await window.api.getComics().catch((error) => {
  store.error = error.message;
});
watch(current, (value) => currentList.value = data.comics.slice((value - 1) * 8, value * 8), { immediate: true });
</script>
<style lang="scss" scoped>
.comic {
  @apply rounded-md;
  height: 170px;
  width: 189px;
  background-color: #8a7c92;
  justify-self: center;
}
</style>