import { RouteRecordRaw } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const comics: RouteRecordRaw[] = [
  {
    path: '/comic/:id',
    name: 'comic',
    component: defineAsyncComponent(() => import('@renderer/views/Comic/Viewer.vue')),
  },
];
export default comics;
