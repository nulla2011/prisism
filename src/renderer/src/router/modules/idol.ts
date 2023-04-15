import { RouteRecordRaw } from 'vue-router';
import { defineAsyncComponent } from 'vue';

let idols: RouteRecordRaw[] = [
  {
    path: '/idol/:idolName',
    name: 'idol',
    component: defineAsyncComponent(() => import('@renderer/views/idol/index.vue')),
  },
];
export default idols;
