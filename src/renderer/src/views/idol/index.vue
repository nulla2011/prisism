<template>
  <div>{{ data }}</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import idols from '@renderer/shared/constants/idols';
const route = useRoute();

const id = idols.findIndex((item) => item.roman === (route.params.idolName as string)) + 1;
let data = ref({})
onMounted(async () => {
  data.value = await window.api.getIdolInfo(id)
})
</script>