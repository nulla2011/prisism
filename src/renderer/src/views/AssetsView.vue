<template>
  <a-layout class="bg-transparent">
    <a-layout-header class="flex items-center justify-between pl-0 pr-5 bg-transparent">
      <Title title="资源预览" lang="zh" />
    </a-layout-header>
    <a-layout-content class="py-[20px] px-24">
      <a-select class="w-full" size="large" show-search :filter-option="false" v-model:value="state.value"
        :options="state.data" @search="handleSearch"></a-select>
      <!-- <div class="w-32 flex justify-center place-items-center"><a-checkbox v-model:checked="isRegX">使用正则</a-checkbox>
      </div> -->
      <Assets :path="state.value" :key="state.value" />
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import Title from '@renderer/components/Title.vue';
import Assets from '@renderer/components/Assets.vue';
import { debounce } from 'lodash-es';
import useError from '@renderer/store/useError';
const store = useError();

const state = reactive<{ value: string, data: Record<string, string>[] }>({
  value: '',
  data: []
});
const handleSearch = debounce(async (value: string) => {
  if (value) {
    const list: string[] = await window.api.queryDB(`%${value}%`).catch((error) => {
      store.error = error.message;
    });
    state.data = list.map((n) => { return { value: n } });
  }
}, 400)
</script>