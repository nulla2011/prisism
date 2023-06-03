<template>
  <a-card :bodyStyle="{ padding: '0px' }" hoverable class="card select-none">
    <div class="img-container w-full h-auto overflow-hidden">
      <img :src="data.imagesrc" class="image duration-200" loading="lazy" />
    </div>
    <div class="text text-center p-1 font-bold bg-white" :style="style">{{ data.name }}</div>
  </a-card>
</template>
<script setup lang="ts">
let props = defineProps<{ data: { name: string, imagesrc: string, fontSize: number } }>()
let style = { '--fontSize': props.data.fontSize + 'px' }
</script>
<style lang="scss" scoped>
.img-container {
  aspect-ratio: 71/40;
}

.image {
  background-color: #f5f5f5;
}

.image:hover {
  transform: scale(1.12);
}

.text {
  font-family: HummingStd;
  font-size: var(--fontSize);
}
</style>