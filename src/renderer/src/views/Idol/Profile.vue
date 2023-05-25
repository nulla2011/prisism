<template>
  <img :src="useGetUrlHash(homeCardPath, rCardId, 'png', rCardHash)" class="image">
</template>
<script setup lang="ts">
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { homeCardPath } from '@renderer/shared/constants/paths';
const props = defineProps<{ data: idol }>();
let rCardId = String(1020000010 + Number(props.data.id) * 10000);
let rCardHash = props.data.produceIdols.find(elem => elem.id === rCardId)!.hash;
</script>
<style lang="scss" scoped>
.image {
  position: absolute;
  width: auto;
  height: 575px;
  bottom: 0px;
  left: -100px;
}
</style>