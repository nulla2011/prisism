<template>
  <el-container>
    <el-header class="flex items-center">
      <span class="name">{{ data.name }}</span>
      <el-radio-group size="large" v-model="tab">
        <el-radio-button label="profile">资料</el-radio-button>
        <el-radio-button label="produce-idol">偶像</el-radio-button>
      </el-radio-group></el-header>
    <el-main style="height:calc(720 - 60)">
      <div class="main-container w-full"></div>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import idols from '@renderer/shared/constants/idols';
import { ref } from 'vue';
const route = useRoute();

const id = idols.findIndex((item) => item.roman === (route.params.idolName as string)) + 1;
let data = await window.api.getIdolInfo(id);
let tab = ref('profile')
</script>
<style lang="scss" scoped>
.name {
  font-family: HummingStd;
  font-size: 24px;
  color: var(--el-text-color-primary);
  // font-weight: bold;
}

.main-container {
  height: 600px;
  border-style: solid;
  border-color: #9b949f;
  border-radius: 8px;
  border-width: 2px;
}
</style>