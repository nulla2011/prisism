<template>
  <div class="flex pl-60 pr-28 py-24">
    <ol class="w-60">
      <li><a href="#cache">数据管理</a></li>
      <li><a href="#restart">重新启动</a></li>
      <li><a href="#information">应用信息</a></li>
    </ol>
    <main class="flex-1">
      <h1 id="cache">缓存管理</h1>
      <a-button size="large" type="primary" @click="clearCache">清除浏览缓存</a-button>
      <a-button size="large" type="primary" danger @click="clearData">清除数据</a-button>
      <h1 id="restart">重新启动</h1>
      <a-button size="large" type="primary">重启应用</a-button>
      <h1 id="information">应用信息</h1>
      <ul class="versions">
        <li class="electron-version">Electron v{{ versions.electron }}</li>
        <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
        <li class="node-version">Node v{{ versions.node }}</li>
        <li class="v8-version">V8 v{{ versions.v8 }}</li>
      </ul>
    </main>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
const versions = reactive({ ...window.electron.process.versions })
const clearCache = () => {
  window.api.clearCache();
}
const clearData = () => {

}
</script>
<style lang="scss" scoped>
ol {
  list-style: none;
}
</style>