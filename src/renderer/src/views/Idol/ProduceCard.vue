<template>
  <a-row class="justify-center px-16 py-4" :gutter="24">
    <template v-for="card in list">
      <a-col :span="6" class="card-link">
        <router-link :to="{ name: 'card', params: { id: card.id } }">
          <card-card
            :data="{ name: useGetCardName(card.name), imagesrc: useGetUrlHash(produceIdolCardPath, card.id, 'jpg', card.hash), fontSize: 18 }"></card-card>
        </router-link>
      </a-col>
      <a-col :span="6" class="card-link">
        <router-link :to="{ name: 'card', params: { id: card.id } }">
          <card-card
            :data="{ name: useGetCardName(card.name), imagesrc: useGetUrlHash(produceIdolFesCardPath, card.id, 'jpg', card.hash), fontSize: 18 }"></card-card>
        </router-link>
      </a-col>
    </template>
  </a-row>
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
  margin-block: 2rem;
}
</style>