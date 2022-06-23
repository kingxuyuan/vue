/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-06-23 22:53:09
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-24 02:28:14
 * @Description: 
 */
import { createApp } from "vue";
import App from "@/components/App.vue";
import "@/registerServiceWorker";

import router from "@/router";
import { store, key } from '@/store';

createApp(App).use(store, key).use(router).mount("#app");
