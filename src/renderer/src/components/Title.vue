<template>
  <span :class="`name select-none ${lang === 'ja' ? 'font-HumStd' : 'font-yuanti'}`">{{ title }}</span>
</template>
<script setup lang="ts">
const props = defineProps({ title: String, lang: { type: String, default: 'ja' } })
</script>
<style lang="scss" scoped>
.name {
  font-size: 24px;
  background-image: url(@renderer/assets/image/common_header_base_l.png);
  height: 56px;
  width: 371px;
  line-height: 56px;
  padding-left: 50px;
}
</style>