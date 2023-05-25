<template>
  <el-row class="justify-center" type="flex">
    <template v-for="card in list">
      <el-col :span="5" class="card-link">
        <router-link :to="{ name: 'card', params: { id: card.id } }">
          <card-card
            :data="{ name: useGetCardName(card.name), imagesrc: useGetUrlHash(produceIdolCardPath, card.id, 'jpg', card.hash), fontSize: 18 }"></card-card>
        </router-link>
      </el-col>
      <el-col :span="5" class="card-link">
        <router-link :to="{ name: 'card', params: { id: card.id } }">
          <card-card
            :data="{ name: useGetCardName(card.name), imagesrc: useGetUrlHash(produceIdolFesCardPath, card.id, 'jpg', card.hash), fontSize: 18 }"></card-card>
        </router-link>
      </el-col>
    </template>
  </el-row>
</template>
<script setup lang="ts">
import CardCard from '@renderer/shared/components/Card.vue'
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { produceIdolCardPath, produceIdolFesCardPath } from '@renderer/shared/constants/paths'
import useGetCardName from '@renderer/shared/composables/useGetCardName';
const props = defineProps<{ list: Record<string, any>[] }>()
</script>
<style type="scss" scoped>
.card-link {
  margin: 2rem 10px;
}
</style>