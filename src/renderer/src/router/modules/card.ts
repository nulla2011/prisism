import { RouteRecordRaw } from 'vue-router';

const card: RouteRecordRaw[] = [
  {
    path: '/card/:id',
    name: 'card',
    component: () => import('@renderer/views/Card/index.vue'),
  },
];
export default card;
