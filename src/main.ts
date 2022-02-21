/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 15:45:58
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-21 12:39:54
 * @Description: 
 */
import { createApp } from 'vue';
import { setupRouter } from './router/index';

import App from './App.vue';
import '@/assets/styles/main.scss';

const app = createApp(App);

setupRouter(app);

app.mount('#app')
