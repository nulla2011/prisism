<template>
  <el-card :body-style="{ padding: '0px' }" class="card">
    <div class="img-container w-full h-auto overflow-hidden">
      <el-image :src="data.imagesrc" class="image duration-200" />
    </div>
    <div class="text text-center p-1 font-bold bg-white">{{ data.name }}</div>
  </el-card>
</template>
<script setup lang="ts">
let props = defineProps<{ data: { name: string, roman: string, imagesrc: string } }>()
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
  font-size: 24px;
}
</style>