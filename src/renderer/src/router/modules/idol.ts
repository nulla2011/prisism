import { RouteRecordRaw } from 'vue-router';

let idols: RouteRecordRaw[] = [
  {
    path: '/idol/:idolName',
    name: 'idol',
    component: () => import('@renderer/views/idol/index.vue'),
  },
];
export default idols;
