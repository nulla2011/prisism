<template>
  <div class="card-warp h-[120px] bg-white border border-solid border-[#958e99] rounded-xl flex items-center">
    <img class="w-[110px] h-[110px] ml-2 mr-0.5"
      :src="useGetUrlHash(costumeStandIconPath, data.idolId, 'png', data.hash)" />
    <img class="w-[110px] h-[110px] ml-0.5 mr-2"
      :src="useGetUrlHash(costumeStandLiveIconPath, data.idolId, 'png', data.hash)" />
    <div class="h-[110px] flex-1 flex flex-col mr-2">
      <div class="flex-1 flex items-center">
        <div class="h-[54px] w-[57px] flex justify-center items-center">
          <img :src="getLogo()" />
        </div>
        <div class="flex-1 ml-1 font-HumStd text-[21px]" :style="{ color: token.colorText }">{{ data.name }}</div>
      </div>
      <hr class="flex-none">
      <div class="flex-1 flex items-center">
        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleClick">
              <a-menu-item key="1">通常</a-menu-item>
              <a-menu-item key="2">通常 Live</a-menu-item>
              <a-menu-item key="3">Q版</a-menu-item>
              <a-menu-item key="4">Q版 Live</a-menu-item>
            </a-menu>
          </template>
          <a-button>Spine 预览</a-button>
        </a-dropdown>
        <a-button>详细</a-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { costumeStandIconPath, costumeStandLiveIconPath } from "@renderer/shared/constants/paths";
import iconSkin from '@renderer/assets/image/icon_skin.png';
import iconRarity4 from '@renderer/assets/image/icon_rarity/icon_l_rarity_4.png'
import iconRarity3 from '@renderer/assets/image/icon_rarity/icon_l_rarity_3.png'
import iconRarity2 from '@renderer/assets/image/icon_rarity/icon_l_rarity_2.png'
import type { MenuProps } from 'ant-design-vue';
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();
const props = defineProps<{ data: Record<string, any> }>();

const handleClick: MenuProps['onClick'] = (e) => {
  console.log(e);
}
const getLogo = () => {
  if (props.data.isSkin) {
    return iconSkin
  } else {
    switch (props.data.rarity) {
      case 4:
        return iconRarity4;
      case 3:
        return iconRarity3;
      case 2:
        return iconRarity2;
      default:
        return;
    }
  }
}
</script>
<style lang="scss" scoped>
.card-warp {
  box-shadow: 0 5px #b1b1b1;
}

hr {
  border-top: 2px dashed #4a424a;
}

.text {
  font-family: HummingStd;
  font-size: 18px;
}
</style>
