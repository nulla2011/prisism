import { RouteRecordRaw } from 'vue-router';

let card: RouteRecordRaw[] = [
  {
    path: '/card/:id',
    name: 'card',
    component: () => import('@renderer/views/Card/index.vue'),
  },
];
export default card;
