/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 15:45:58
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-12 16:37:59
 * @Description: 
 */
import { createApp } from 'vue';
import { setupRouter } from './router/index';
import 'normalize.css';
import App from './App.vue';

const app = createApp(App);

setupRouter(app);

app.mount('#app')
