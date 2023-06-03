import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainMenu from '@renderer/views/MainMenu.vue';
import Commu from '@renderer/views/Commu.vue';
import Settings from '@renderer/views/Settings.vue';
import Music from '@renderer/views/Music/index.vue';

const metaRouters = import.meta.glob('./modules/*.ts', { eager: true, import: 'default' });
const routeList: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach((item) => {
  const mod = metaRouters[item] || {};
  const modList = Array.isArray(mod) ? mod : [mod];
  routeList.push(...modList);
});
let routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MainMenu,
  },
  {
    path: '/commu',
    name: 'commu',
    component: Commu,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/music',
    name: 'music',
    component: Music,
  },
];
routes = routes.concat(routeList);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
