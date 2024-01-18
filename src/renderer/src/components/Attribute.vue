<template>
  <div class="flex">
    <div class="attr-name">{{ attrName }}</div>
    <div class="attr">{{ value }}</div>
  </div>
</template>
<script setup lang="ts">
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();
const props = defineProps<{ attrName: string, value: string }>();
</script>
<style lang="scss" scoped>
.attr-name {
  @apply text-center bg-cover text-white font-yuanti text-lg inline-block;
  height: 27px;
  width: 95px;
  line-height: 27px;
  background-image: url('@renderer/assets/image/profile_title_base.png');
}

.attr {
  @apply text-xl font-HumStd px-3 inline-block align-top relative flex-1;
  color: v-bind('token.colorText');
  height: 27px;
  line-height: 24px;
  left: -4px;
  background-image: url('@renderer/assets/image/idol_detail_fan_line.png');
  background-repeat: no-repeat;
  background-position: left bottom;
}
</style>
