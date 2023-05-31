import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/css/reset.scss';
import './assets/css/tailwind.css';
import './styles/global.scss';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import '@icon-park/vue-next/styles/index.css';

import Error from '@renderer/components/Error.vue';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(Antd);
app.component('Error', Error);
app.mount('#app');
