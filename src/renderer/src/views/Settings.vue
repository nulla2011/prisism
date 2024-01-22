<template>
  <div class="flex pl-60 pr-28 py-24 text-base" :style="{ color: token.colorText }">
    <ol class="w-60">
      <!-- <li><a href="#cache">数据管理</a></li>
      <li><a href="#restart">重新启动</a></li>
      <li><a href="#information">应用信息</a></li> -->
    </ol>
    <main class="flex-1">
      <div class="my-4">
        <h1 id="cache">数据管理</h1>
        <a-button class="button" size="large" type="primary" @click="clearCache">清除浏览缓存</a-button>
        <a-button class="button" size="large" type="primary" danger @click="clearData">清除数据</a-button>
      </div>
      <div class="my-4">
        <h1 id="restart">重新启动</h1>
        <a-button class="button" size="large" type="primary" @click="restart">重启应用</a-button>
      </div>
      <div class="my-4">
        <h1 id="restart">版本信息</h1>
        <div>资源版本号：<span>{{ gameVersions.assetVersion }}</span></div>
        <div>api 版本号：<span>{{ gameVersions.apiVersion }}</span></div>
      </div>
      <div class="my-4">
        <h1 id="information">应用信息</h1>
        <ul class="versions ml-6">
          <li class="electron-version">Electron v{{ versions.electron }}</li>
          <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
          <li class="node-version">Node v{{ versions.node }}</li>
          <li class="v8-version">V8 v{{ versions.v8 }}</li>
        </ul>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();
const versions = reactive({ ...window.electron.process.versions });
const gameVersions = reactive({ ... await window.api.gameVersions() });
const clearCache = () => {
  window.api.clearCache();
}
const clearData = () => {

}
const restart = () => {
  window.api.restart();
}
</script>
<style lang="scss" scoped>
ol {
  list-style: none;
}

ul {
  list-style: circle
}

h1 {
  @apply text-2xl font-yuanti border-solid border-0 border-b border-[#958e99];
}

.button {
  @apply mx-2;
}
</style>