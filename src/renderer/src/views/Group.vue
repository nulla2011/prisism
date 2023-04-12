<template>
  <el-row class="top-28 justify-center" type="flex">
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

const route = useRoute();
let idolList: Ref<typeof idols> = ref(usePickIdols(route.params.groupName as string))
// onMounted(() => idolList.value = 
watch(() => route.params.groupName, (value) => idolList.value = usePickIdols(value as string))

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