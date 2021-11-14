import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import { setupDirective } from '@/directives';
import { setupComponent } from '@/utils/create-component';
import { steupPlugin } from '@/plugins';
import { NODE_ENV } from '@/utils/constants';
import VConsole from 'vconsole';
import './configs/permission';
import 'lib-flexible';
// import '@/configs/debugger.js';

import './assets/css/base.css'; //初始化样式
import './registerServiceWorker'; //PWA
import './assets/scss/global.scss'; //全局样式

NODE_ENV === 'kmdev' && new VConsole();

const app = createApp(App);
setupRouter(app); //vue-router
setupStore(app); //vuex
setupDirective(app); //directive
setupComponent(app); //component
steupPlugin(app); //插件

app.mount('#app');
