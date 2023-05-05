<template>
  <el-container>
    <el-header class="flex items-center justify-between">
      <span class="name select-none">{{ data?.name }}</span>
      <el-radio-group size="small" v-model="tab">
        <el-radio-button label="profile" class="button"><span class="tab-name">资料</span></el-radio-button>
        <el-radio-button label="produce-idol" class="button">
          <span class="icon icon-p"></span><span class="tab-name tab-idol">偶像</span>
        </el-radio-button>
        <el-radio-button label="support-idol" class="button">
          <span class="icon icon-s"></span><span class="tab-name tab-idol">偶像</span>
        </el-radio-button>
        <el-radio-button label="voices" class="button"><span class="tab-name">语音</span></el-radio-button>
        <el-radio-button label="costume" class="button"><span class="tab-name">衣装</span></el-radio-button>
        <el-radio-button label="commu" class="button"><span class="tab-name">剧情</span></el-radio-button>
      </el-radio-group>
    </el-header>
    <el-main class="el-main">
      <div class="main-container">
        <template v-if="!store.error">
          <produce-card v-if="tab === 'produce-idol'" :list="data.produceIdols" />
          <support-card v-if="tab === 'support-idol'" :list="data.supportIdols" />
          <profile v-if="tab === 'profile'" :data="data" />
          <voices v-if="tab === 'voices'" />
        </template>
      </div>
    </el-main>
  </el-container>
  <Error v-if="store.error">{{ store.error }}</Error>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import idols from '@renderer/shared/constants/idols';
import ProduceCard from './ProduceCard.vue';
import SupportCard from './SupportCard.vue';
import Profile from './Profile.vue';
import Voices from './Voices.vue';
// import test from '@renderer/test/test.json';
import useError from '@renderer/store/useError';
const store = useError();
const route = useRoute();

const id = idols.findIndex((item) => item.roman === (route.params.idolName as string)) + 1;
let tab = ref('profile')
// let data = test;
let data: idol = await window.api.getIdolInfo(id).catch((error) => {
  store.error = error.message;
});
</script>
<style lang="scss" scoped>
.name {
  font-family: HummingStd;
  font-size: 24px;
  color: var(--el-text-color-primary);
  background-image: url(@renderer/assets/image/common_header_base_l.png);
  height: 56px;
  width: 371px;
  line-height: 56px;
  padding-left: 50px;
}

@import '@renderer/styles/global.scss';

.main-container {
  position: relative;
  height: calc(100vh - 100px);
  border-style: solid;
  border-color: #9b949f;
  border-radius: 8px;
  border-width: 2px;
  background-color: #FFF5;
  overflow-y: auto;
  @include scrollbar;
}

.button {
  @apply outline-none;
}

$height: 33px;

.tab-name {
  font-family: yuanti;
  font-size: 20px;
  line-height: $height;
  height: $height;
  text-align: center;
  vertical-align: top;
  min-width: 100px;
  display: inline-block;
}

.tab-idol {
  min-width: 100px - $height - 5px;
}

.icon {
  width: 33px;
  height: 33px;
  background-size: contain;
  display: inline-block;
  margin-right: 5px;
}

.icon-p {
  background-image: url(@renderer/assets/image/icon_idol_type_produce.png);
}

.icon-s {
  background-image: url(@renderer/assets/image/icon_idol_type_support.png);
}
</style>