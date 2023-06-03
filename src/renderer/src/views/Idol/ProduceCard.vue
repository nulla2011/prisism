<template>
  <div class="px-16 py-4">
    <a-row :gutter="28" class="justify-center">
      <template v-for="card in list">
        <a-col :span="6" class="my-8">
          <router-link :to="{ name: 'card', params: { id: card.id } }">
            <card-card
              :data="{ name: useGetCardName(card.name), imagesrc: useGetUrlHash(produceIdolCardPath, card.id, 'jpg', card.hash), fontSize: 18 }"></card-card>
          </router-link>
        </a-col>
        <a-col :span="6" class="my-8">
          <router-link :to="{ name: 'card', params: { id: card.id } }">
            <card-card
              :data="{ name: useGetCardName(card.name), imagesrc: useGetUrlHash(produceIdolFesCardPath, card.id, 'jpg', card.hash), fontSize: 18 }"></card-card>
          </router-link>
        </a-col>
      </template>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import CardCard from '@renderer/shared/components/Card.vue'
import useGetUrlHash from '@renderer/shared/composables/useGetUrlHash';
import { produceIdolCardPath, produceIdolFesCardPath } from '@renderer/shared/constants/paths'
import useGetCardName from '@renderer/shared/composables/useGetCardName';
const props = defineProps<{ list: Record<string, any>[] }>()
</script>