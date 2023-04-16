import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/reset.scss';
import './assets/css/tailwind.css';
import './styles/global.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './styles/element-theme.scss';
import '@icon-park/vue-next/styles/index.css';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
