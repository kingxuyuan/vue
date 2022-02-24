/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 15:45:58
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 13:00:26
 * @Description: 
 */
import { createApp } from 'vue';
import { setupRouter } from '@/router/index';
import { setupDirective } from '@/directives/index';

import App from './App.vue';
import '@/assets/styles/main.scss';

const app = createApp(App);

setupRouter(app);
setupDirective(app);

app.mount('#app')
