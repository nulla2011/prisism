<template>
  <div class="flex flex-wrap">
    <a-image-preview-group>
      <div class="m-2.5" v-for="name in imgList">
        <a-image :width="182" :src="useGetUrlHash(prefix, getFileName(name), 'jpg')" />
      </div>
    </a-image-preview-group>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from 'vue';
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { getFileName } from '@renderer/utils'
import useError from '@renderer/store/useError';
const store = useError();
const props = defineProps<{ prefix: string }>();

// const marker = ref<HTMLDivElement | null>(null);
onMounted(() => {
  document.addEventListener('scroll', scrollListener)
})
onUnmounted(() => {
  document.removeEventListener('scroll', scrollListener)
})
const scrollListener = (event) => {
  const doc = document.documentElement
  if (doc.scrollTop + doc.clientHeight >= doc.scrollHeight - 3) {
    loadmore()
  }
}
const loadmore = () => {
  imgList.value = imgList.value.concat(list.slice(imgLength, imgLength + loadCount));
  imgLength += loadCount;
}
const loadCount = 60;
const imgList: Ref<string[]> = ref([]);
let imgLength = 0;
const list: string[] = await window.api.queryDB(`${props.prefix}%`).catch((error) => {
  store.error = error.message;
});
imgList.value = list.slice(0, loadCount);
imgLength += loadCount;
</script>