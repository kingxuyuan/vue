/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-11-14 23:43:27
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 01:25:43
 * @Description: 路由管理
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const whiteRouter = [
    {
        path: "/",
        redirect: '/home'
    }, {
        path: "/home",
        name: "Home",
        component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    },
]

const authRouter = [
    {
        path: "/home",
        name: "Home",
        component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    },
]

const routes: Array<RouteRecordRaw> = [
    ...whiteRouter,
    ...authRouter
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
