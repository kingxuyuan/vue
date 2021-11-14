/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-11-15 02:32:43
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 03:34:00
 * @Description: 入口
 */
import { createApp } from "vue";
import 'lib-flexible';
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { setupStore } from "@/store";
import { setupVant } from '@/plugins/vant';
import '@/assets/style/index.scss';

const config = require(`../platforms/${process.env.VUE_APP_PLATFORM}/config.json`);
console.log(config);

const app = createApp(App);
setupVant(app);
setupStore(app);

app.use(router).mount("#app");

// window.document.documentElement.setAttribute( "data-theme", 'light' );