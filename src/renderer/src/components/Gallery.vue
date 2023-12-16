<template>
  <div class="flex flex-wrap">
    <a-image-preview-group>
      <div class="m-2.5" v-for="name in imgList">
        <a-image :width="182" :src="useGetUrlHash(prefix, getFileName(name), 'jpg')" />
      </div>
    </a-image-preview-group>
  </div>
  <div ref="marker" @scroll="handleScroll" class="w-10 h-10 bg-black"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { getFileName } from '@renderer/utils'
import useError from '@renderer/store/useError';
const store = useError();
const props = defineProps<{ prefix: string }>();

const marker = ref<HTMLDivElement | null>(null);
const handleScroll = () => {
  if (marker.value) {
    if (marker.value?.scrollTop + marker.value?.clientHeight >= marker.value?.scrollHeight - 20) {
      loadmore()
    }
  }
}
const loadmore = () => {
  imgList = imgList.concat(list.slice(imgLength, imgLength + loadCount));
  imgLength += loadCount;
  console.log(11111);
}
const loadCount = 100;
let imgList: string[] = [];
let imgLength = 0;
const list: string[] = await window.api.queryDB(`${props.prefix}%`).catch((error) => {
  store.error = error.message;
});
imgList = list.slice(0, loadCount);
imgLength += loadCount;
</script>