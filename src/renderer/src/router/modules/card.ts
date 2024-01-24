import { RouteRecordRaw } from 'vue-router';
import Card from '@renderer/views/Card/index.vue';

const card: RouteRecordRaw[] = [
  {
    path: '/card/:id',
    name: 'card',
    component: Card,
  },
];
export default card;
