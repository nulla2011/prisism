<template>
  <div v-if="groupName" class="h-32 flex justify-center pt-4"><img
      :src="useGetUrlHash(unitLogoPath, idolList[0].unitId.padStart(3, '0'), 'png')" alt="unit logo" class="unit-logo ">
  </div>
  <a-row class="pt-8 px-20 justify-center w-full" :gutter="24">
    <a-col v-for="idol in idolList" :span="6" class="idol-link">
      <router-link :to="{ name: 'idol', params: { idolName: idol.roman } }">
        <idol-card
          :data="{ name: idol.name, imagesrc: 'https://idollist.idolmaster-official.jp/images/character_main/' + reverseName(idol.roman) + '_02.jpg', fontSize: 24 }"></idol-card>
      </router-link>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import IdolCard from "@renderer/shared/components/Card.vue";
import { useRoute } from "vue-router";
import usePickIdols from "@renderer/shared/composables/usePickIdols";
import idols from "@renderer/shared/constants/idols";
import { unitLogoPath } from "@renderer/shared/constants/paths";
import useGetUrlHash from "@renderer/shared/composables/useGetUrlHash";

const route = useRoute();
const groupName = route.params.groupName;
let idolList;
if (groupName) {
  idolList = usePickIdols(route.params.groupName as string);
} else {
  idolList = idols
}
// onMounted(() => idolList.value = 
// watch(() => route.params.groupName, (value) => idolList.value = usePickIdols(value as string))

const reverseName = (name: string) => {
  return name.replace(/^(\w+)_(\w+)$/, "$2_$1");
}
// let imgsrc = (idol: typeof idols[0]) => `https://idollist.idolmaster-official.jp/images/character_main/${idol.roman}_01.jpg`
</script>
<style lang="scss" scoped>
.idol-link {
  margin-block: 2rem;
}
</style>