/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 18:44:46
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-18 16:09:20
 * @Description: 路由管理
 */
import { App } from 'vue';
import { Router, createRouter, createWebHistory } from 'vue-router';

import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const routes = [
    { path: '/home', component: () => import('../views/Home.vue') },
    { path: '/login', component: () => import('../views/Login.vue') },
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    next()
})

router.afterEach(() => {
    setTimeout(() => {
        NProgress.done();
    }, 1000);
})

export const setupRouter = (app: App) => {
    app.use(router);
}