<template>
  <img class="image" :src="useGetUrlHash(homeCardPath, rCardId, 'png', rCardHash)">
  <section
    class="warp relative right-8 top-8 ml-auto px-16 py-8 w-[680px] h-[560px] bg-white border border-solid border-[#958e99] rounded-xl">
    <div class="w-full flex">
      <div class="flex-1">
        <div class="attr-name mb-[6px]">名字</div>
        <div class="attr attr1 mb-[8px]">{{ `${data.name}（${data.nameKana}）` }}</div>
        <div class="attr-name mb-[6px]">组合</div>
        <div class="attr attr1">{{ data.unit.name }}</div>
      </div>
      <img class="w-[236px] h-[126px] bg-[#f4f3f4] rounded-lg border-none"
        :src="useGetUrlHash(unitLogoPath, data.unit.id.padStart(3, '0'), 'png')" />
    </div>
    <div class="w-full my-3 grid grid-cols-2 gap-3">
      <Attribute attr-name="年龄" :value="data.age" />
      <Attribute attr-name="血型" :value="`${data.bloodType}型`" />
      <Attribute attr-name="生日" :value="data.birthDay" />
      <Attribute attr-name="星座" :value="data.starSign" />
      <Attribute attr-name="身高" :value="`${data.height}cm`" />
      <Attribute attr-name="体重" :value="`${data.weight}kg`" />
      <Attribute attr-name="三围" :value="`${data.bust}/${data.waist}/${data.hip}`" />
      <Attribute attr-name="惯用手" :value="data.arm" />
    </div>
    <div class="w-full my-3 grid grid-cols-1 gap-3">
      <Attribute attr-name="出生地" :value="data.place" />
      <Attribute attr-name="兴趣" :value="data.hobby" />
      <Attribute attr-name="特长" :value="data.specialty" />
      <Attribute attr-name="CV." :value="data.characterVoice" />
    </div>
  </section>
</template>
<script setup lang="ts" >
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { homeCardPath } from '@renderer/shared/constants/paths';
import { unitLogoPath } from "@renderer/shared/constants/paths";
import Attribute from '@renderer/components/Attribute.vue';
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
  width: 95px;
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