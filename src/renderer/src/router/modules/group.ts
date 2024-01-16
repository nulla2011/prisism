import { RouteRecordRaw } from 'vue-router';
// import groups from '@/constant/group';

// let children = new Array<RouteRecordRaw>();
// for (const key in groups) {
//   children.push({
//     name: groups[key as keyof typeof groups],
//     path: key,
//     component: Group,
//   } as RouteRecordRaw);
// }
const groups: RouteRecordRaw[] = [
  {
    path: '/all-idol',
    component: () => import('@renderer/views/Group.vue'),
  },
  {
    path: '/group/:groupName',
    name: 'GROUP',
    component: () => import('@renderer/views/Group.vue'),
  },
];

export default groups;
