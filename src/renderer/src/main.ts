import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/css/reset.scss';
import './assets/css/tailwind.css';
import './styles/global.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './styles/element-theme.scss';
import '@icon-park/vue-next/styles/index.css';

import Error from '@renderer/components/Error.vue';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.component('Error', Error);
app.mount('#app');
