/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 18:44:46
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-19 17:01:13
 * @Description: 路由管理
 */
import { App, computed } from 'vue';
import { useStore } from '@/store';
import { Router, createRouter, createWebHistory } from 'vue-router';

import authRouter from './authRouter';
import whiteRouter from './whiteRouter';

import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });

const store = useStore();

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        ...authRouter,
        ...whiteRouter
    ]
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    const token = computed(() => store.getters.getterToken).value;

    if(to.meta?.title) (document as any).title = to.meta?.title;

    if (to.meta?.auth && !token)
        next('/login');
    else
        next();
})

router.afterEach(() => {
    NProgress.done();
})

export const setupRouter = (app: App) => {
    app.use(router);
}