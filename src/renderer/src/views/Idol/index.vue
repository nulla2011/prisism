<template>
  <a-layout class="bg-transparent">
    <a-layout-header class="flex items-center justify-between pl-0 pr-5 bg-transparent">
      <span class="name select-none">{{ data?.name }}</span>
      <a-radio-group size="large" v-model:value="tab" button-style="solid">
        <a-radio-button value="profile" class="button"><span class="tab-name">资料</span></a-radio-button>
        <a-radio-button value="produce-idol" class="button">
          <span class="icon icon-p"></span><span class="tab-name tab-idol">偶像</span>
        </a-radio-button>
        <a-radio-button value="support-idol" class="button">
          <span class="icon icon-s"></span><span class="tab-name tab-idol">偶像</span>
        </a-radio-button>
        <a-radio-button value="voices" class="button"><span class="tab-name">语音</span></a-radio-button>
        <a-radio-button value="costume" class="button"><span class="tab-name">衣装</span></a-radio-button>
        <a-radio-button value="commu" class="button"><span class="tab-name">剧情</span></a-radio-button>
      </a-radio-group>
    </a-layout-header>
    <a-layout-content class="p-[20px]">
      <div class="main-container">
        <template v-if="!store.error">
          <produce-card v-if="tab === 'produce-idol'" :list="data.produceIdols" />
          <support-card v-if="tab === 'support-idol'" :list="data.supportIdols" />
          <Profile v-if="tab === 'profile'" :data="data" />
          <Voices v-if="tab === 'voices'" :list="data.voices" />
          <Costume v-if="tab === 'costume'" />
        </template>
      </div>
    </a-layout-content>
  </a-layout>
  <Error v-if="store.error">{{ store.error }}</Error>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import idols from '@renderer/shared/constants/idols';
import ProduceCard from './ProduceCard.vue';
import SupportCard from './SupportCard.vue';
import Profile from './Profile.vue';
import Voices from './Voices.vue';
import Costume from './Costume.vue';
// import test from '@renderer/test/test.json';
import useError from '@renderer/store/useError';
const store = useError();
const route = useRoute();

const id = idols.findIndex((item) => item.roman === (route.params.idolName as string)) + 1;
// onMounted(() => document.body.style.overflow = 'hidden');
// onUnmounted(() => document.body.style.overflow = '');
let tab = ref<string>('profile')
// let data = test;
const data: idol = await window.api.getIdolInfo(id).catch((error) => {
  store.error = error.message;
});
</script>

<style lang="scss" scoped>
.name {
  font-family: HummingStd;
  font-size: 24px;
  background-image: url(@renderer/assets/image/common_header_base_l.png);
  height: 56px;
  width: 371px;
  line-height: 56px;
  padding-left: 50px;
}

@import '@renderer/styles/global.scss';

.main-container {
  position: relative;
  height: calc(100vh - 104px);
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
  min-width: 100px;
  display: inline-block;
}

.tab-idol {
  min-width: 100px - $height - 5px;
}

.icon {
  vertical-align: top;
  width: 30px;
  height: 30px;
  background-size: contain;
  display: inline-block;
  margin-right: 5px;
  position: relative;
  top: 3px;
}

.icon-p {
  background-image: url(@renderer/assets/image/icon_idol_type_produce.png);
}

.icon-s {
  background-image: url(@renderer/assets/image/icon_idol_type_support.png);
}
</style>