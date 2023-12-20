<template>
  <costume-card v-for="costume in list" />
</template>
<script setup lang="ts">
import CostumeCard from '@renderer/components/CostumeCard.vue';
const props = defineProps<{ list: Record<string, string | number | boolean>[] }>();
const handleClick = () => {
  window.api.test()
}
</script>