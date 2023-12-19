import { createApp } from 'vue';
import App from './App.vue';
import '../src/assets/css/reset.scss';
import '../src/assets/css/tailwind.css';
import '../src/styles/global.scss';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(Antd);
app.mount('#app');
