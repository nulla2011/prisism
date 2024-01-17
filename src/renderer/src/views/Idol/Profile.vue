<template>
  <img class="image" :src="useGetUrlHash(homeCardPath, rCardId, 'png', rCardHash)">
  <div
    class="warp relative right-8 top-8 ml-auto px-16 py-8 w-[680px] h-[560px] bg-white border border-solid border-[#958e99] rounded-xl">
    <div class="w-full flex">
      <div class="flex-1">
        <div class="attr-name mb-[7px]">名字</div>
        <div class="attr attr1 mb-[9px]">{{ `${data.name}（${data.nameKana}）` }}</div>
        <div class="attr-name mb-[7px]">组合</div>
        <div class="attr attr1">{{ data.unit.name }}</div>
      </div>
      <img class="w-[236px] h-[126px] bg-[#f4f3f4] rounded-lg border-none" />
    </div>
  </div>
</template>
<script setup lang="ts">
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { homeCardPath } from '@renderer/shared/constants/paths';
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();
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

.attr-name {
  @apply text-center bg-cover text-white font-yuanti text-lg;
  height: 27px;
  width: 94.5px;
  line-height: 27px;
  background-image: url('@renderer/assets/image/profile_title_base.png');
}

.attr {
  @apply text-xl font-HumStd px-1.5;
  color: v-bind('token.colorText');
  height: 27px;
  line-height: 18px;
  background-image: url('@renderer/assets/image/idol_detail_fan_line.png');
  background-repeat: no-repeat;
  background-position: left bottom;
}
</style>