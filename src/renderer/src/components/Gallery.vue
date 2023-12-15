<template>
  <a-image-preview-group>
    <a-image v-for="name in list" :width="200" :src="useGetUrlHash(prefix, getFileName(name), 'jpg')" />
  </a-image-preview-group>
</template>
<script setup lang="ts">
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { getFileName } from '@renderer/utils'
import useError from '@renderer/store/useError';
const store = useError();
const props = defineProps<{ prefix: string }>()

const list = await window.api.queryDB(`${props.prefix}%`).catch((error) => {
  store.error = error.message;
});
</script>