<template>
  <div class="h-32 flex justify-center pt-4"><img
      :src="useGetUrlHash('images/content/unit/logo/', idolList[0].unitId.padStart(3, '0'), 'png')" alt="unit logo"
      class="unit-logo "></div>
  <el-row class="top-8 justify-center" type="flex">
    <el-col v-for="idol in idolList" :span="5" class="card-link">
      <router-link :to="{ name: 'idol', params: { idolName: idol.roman } }">
        <idol-card
          :data="{ name: idol.name, roman: idol.roman, imagesrc: 'https://idollist.idolmaster-official.jp/images/character_main/' + reverseName(idol.roman) + '_02.jpg' }"></idol-card>
      </router-link>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import IdolCard from "@renderer/shared/components/Card.vue";
import { watch, Ref, ref } from "vue";
import { useRoute } from "vue-router";
import usePickIdols from "@renderer/shared/composables/usePickIdols";
import idols from "@renderer/shared/constants/idols";
import useGetUrlHash from "@renderer/shared/composables/useGetUrlHash";

const route = useRoute();
let idolList: Ref<typeof idols> = ref(usePickIdols(route.params.groupName as string))
// onMounted(() => idolList.value = 
// watch(() => route.params.groupName, (value) => idolList.value = usePickIdols(value as string))

const reverseName = (name: string) => {
  return name.replace(/^(\w+)_(\w+)$/, "$2_$1");
}
// let imgsrc = (idol: typeof idols[0]) => `https://idollist.idolmaster-official.jp/images/character_main/${idol.roman}_01.jpg`
</script>
<style lang="scss">
.card-link {
  margin: 2rem 10px;
}
</style>