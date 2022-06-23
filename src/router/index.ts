/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-06-23 23:23:49
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-24 02:27:22
 * @Description: 
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import(/* webpackChunkName: "Home" */ "../pages/views/Home.vue"),
    },
    // {
    //     path: "/home",
    //     name: "Home",
    //     component: () => import(/* webpackChunkName: "Login" */ "../pages/Home.vue"),
    // },
    // {
    //     path: "/login",
    //     name: "Login",
    //     component: () => import(/* webpackChunkName: "Login" */ "../pages-live/views/Login.vue"),
    // },
    {
        path: "/live",
        name: "Live",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "liveroom" */ "../pages-live/views/Home.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 如果有记录页面的滚动行为
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
});
router.beforeEach((to, from, next) => {
    // if (to.path === '/login' && store.state.user.loginInfo.token) {
    //     next('/');
    // } else {
    //     if (to.meta?.needAuth && !store.state.user.loginInfo.token) {
    //         next({
    //             path: '/login',
    //             query: { redirect: to.fullPath },
    //         });
    //     } else next();
    // }
    // NProgress.done();
    // NProgress.start();
    next();
})

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
    // NProgress.done();
});

export default router;
