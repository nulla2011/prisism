<template>
  <el-container>
    <el-header class="flex items-center">
      <span class="name">{{ data?.name }}</span>
      <el-radio-group size="large" v-model="tab">
        <el-radio-button label="profile">资料</el-radio-button>
        <el-radio-button label="produce-idol">偶像</el-radio-button>
      </el-radio-group>
    </el-header>
    <el-main class="el-main">
      <div class="main-container">
        <produce-card v-if="tab === 'produce-idol'" :list="data?.produceIdols" />
      </div>
    </el-main>
  </el-container>
  <Error v-if="store.error">{{ store.error }}</Error>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import idols from '@renderer/shared/constants/idols';
import ProduceCard from './ProduceCard.vue'
// import test from '@renderer/test/test.json';
import useError from '@renderer/store/useError';
const store = useError();
const route = useRoute();

const id = idols.findIndex((item) => item.roman === (route.params.idolName as string)) + 1;
let tab = ref('profile')
// let data = test;
let data = await window.api.getIdolInfo(id).catch((error) => {
  store.error = error.message;
});
</script>
<style lang="scss" scoped>
.name {
  font-family: HummingStd;
  font-size: 24px;
  color: var(--el-text-color-primary);
  // font-weight: bold;
}

@import '@renderer/styles/global.scss';

.main-container {
  height: calc(100vh - 100px);
  border-style: solid;
  border-color: #9b949f;
  border-radius: 8px;
  border-width: 2px;
  background-color: #FFF5;
  overflow-y: scroll;
  @include scrollbar;
}
</style>