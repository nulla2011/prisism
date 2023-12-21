<template>
  <div class="grid grid-cols-2 gap-y-4 gap-x-4 m-4 ">
    <costume-card v-for="costume in list" :data="costume" />
  </div>
</template>
<script setup lang="ts">
import CostumeCard from '@renderer/components/CostumeCard.vue';
const props = defineProps<{ list: Record<string, string | number | boolean>[] }>();
const handleClick = () => {
  window.api.test()
}
</script>