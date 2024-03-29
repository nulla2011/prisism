import { RouteRecordRaw } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const idols: RouteRecordRaw[] = [
  {
    path: '/idol/:idolName',
    name: 'idol',
    component: defineAsyncComponent(() => import('@renderer/views/Idol/index.vue')),
  },
];
export default idols;
