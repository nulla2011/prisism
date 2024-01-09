<template>
  <a-layout class="bg-transparent">
    <a-layout-header class="flex items-center justify-between pl-0 pr-5 bg-transparent">
      <Title title="背景" />
    </a-layout-header>
    <a-layout-content class="px-[20px] py-2">
      <div class="">
        <a-tabs v-model:activeKey="activeKey" type="card" size="large" centered>
          <a-tab-pane key="1" tab="剧情背景">
            <Gallery key="1" :prefix="eventBGPath" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="待机画面背景">
            <Gallery key="2" :prefix="homeDeckBGPath" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Gallery from '@renderer/components/Gallery.vue';
import Title from '@renderer/components/Title.vue';
import { eventBGPath, homeDeckBGPath } from '@renderer/shared/constants/paths';
const activeKey = ref('1');
</script>