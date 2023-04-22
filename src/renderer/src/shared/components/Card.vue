<template>
  <el-card :body-style="{ padding: '0px' }" class="card">
    <div class="img-container w-full h-auto overflow-hidden">
      <el-image :src="data.imagesrc" class="image duration-200" loading="lazy" />
    </div>
    <div class="text text-center p-1 font-bold bg-white" :style="style">{{ data.name }}</div>
  </el-card>
</template>
<script setup lang="ts">
let props = defineProps<{ data: { name: string, imagesrc: string, fontSize: number } }>()
let style = { '--fontSize': props.data.fontSize + 'px' }
</script>
<style lang="scss" scoped>
.img-container {
  aspect-ratio: 16/9;
}

.image:hover {
  scale: 1.12;
}

.text {
  font-family: HummingStd;
  font-size: var(--fontSize);
}
</style>