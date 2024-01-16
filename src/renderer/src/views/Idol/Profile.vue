<template>
  <img class="image" :src="useGetUrlHash(homeCardPath, rCardId, 'png', rCardHash)">
  <div
    class="warp relative right-8 ml-auto top-8 w-[660px] h-[560px] bg-white border border-solid border-[#958e99] rounded-xl">
  </div>
</template>
<script setup lang="ts">
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { homeCardPath } from '@renderer/shared/constants/paths';
const props = defineProps<{ data: idol }>();
const rCardId = String(1020000010 + Number(props.data.id) * 10000);
const rCardHash = props.data.produceIdols.find(elem => elem.id === rCardId)!.hash;
</script>
<style lang="scss" scoped>
.image {
  position: absolute;
  width: auto;
  height: 575px;
  bottom: 0px;
  left: -100px;
}

.warp {
  box-shadow: 0 5px #b1b1b1;
}
</style>