import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: {
            animationIndex: 1,
            footShow: true,
            requiresAuth: false,
        },
    },
    {
        path: '/shortVideo',
        name: 'ShortVideo',
        component: () => import('../views/shortVideo/index.vue'),
        meta: {
            animationIndex: 1,
            footShow: true,
            requiresAuth: false,
        },
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/search/index.vue'),
        meta: {
            animationIndex: 2,
            footShow: false,
            requiresAuth: false,
        },
    },
    {
        path: '/movies',
        name: 'Movies',
        component: () => import('../views/Movies/index.vue'),
        meta: {
            animationIndex: 2,
            footShow: false,
            requiresAuth: false,
        },
    },
    {
        path: '/game',
        name: 'Game',
        component: () => import('../views/game/index.vue'),
        meta: {
            animationIndex: 2,
            footShow: true,
            requiresAuth: false,
        },
    },
    {
        path: '/active',
        name: 'Active',
        component: () => import('../views/active/index.vue'),
        meta: {
            animationIndex: 3,
            footShow: true,
            requiresAuth: false,
        },
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('../views/user/index.vue'),
        meta: {
            animationIndex: 4,
            footShow: true,
            requiresAuth: false,
        },
    },
    {
        path: '/personInfo',
        name: 'PersonInfo',
        component: () => import('../views/user/personInfo/index.vue'),
        meta: {
            footShow: false,
            requiresAuth: true,
        },
    },
    {
        path: '/wallet',
        name: 'Wallet',
        component: () => import('../views/user/wallet/index.vue'),
        meta: {
            footShow: false,
            requiresAuth: true,
        },
    },
    {
        path: '/member',
        name: 'Member',
        component: () => import('../views/user/member/index.vue'),
        meta: {
            footShow: false,
            requiresAuth: true,
        },
    },
    {
        path: '/shareApp',
        name: 'ShareApp',
        component: () => import('../views/user/shareApp/index.vue'),
        meta: {
            footShow: false,
            requiresAuth: true,
        },
    },
    {
        path: '/recharge',
        name: 'Recharge',
        component: () => import('../views/user/recharge/index.vue'),
        meta: {
            footShow: false,
            requiresAuth: true,
        },
    },
    {
        path: '/rechargeRecord',
        name: 'RechargeRecord',
        component: () => import('../views/user/rechargeRecord/index.vue'),
        meta: {
            footShow: false,
            requiresAuth: true,
        },
    },

    {
        path: '/player',
        name: 'Player',
        component: () => import('../views/player/index.vue'),
        meta: {
            animationIndex: 5,
            requiresAuth: false,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index.vue'),
        meta: {
            footShow: false,
            requiresAuth: false,
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/login/register.vue'),
        meta: {
            footShow: false,
            requiresAuth: false,
        },
    },
    {
        path: '/bindMobile',
        name: 'BindMobile',
        component: () => import('../views/login/bindMobile.vue'),
        meta: {
            footShow: false,
            requiresAuth: false,
        },
    },
    {
        path: '/forgetPassword',
        name: 'ForgetPassword',
        component: () => import('../views/login/forgetPassword.vue'),
        meta: {
            footShow: false,
            requiresAuth: false,
        },
    },
    {
        path: '/userAgreement',
        name: 'UserAgreement',
        component: () => import('../views/help/userAgreement.vue'),
        meta: {
            footShow: false,
            requiresAuth: false,
        },
    },
    {
        path: '/iframe',
        name: 'Iframe',
        component: () => import('../views/iframe/index.vue'),
        meta: {
            footShow: false,
            requiresAuth: false,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NoFound',
        component: () => import('../views/noFound/index.vue'),
        meta: {
            footShow: true,
            requiresAuth: false,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    // scrollBehavior: (to, from, savedPosition): any => {
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         return { x: 0, y: 0 };
    //     }
    // },
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

/**
 * @description: vue-router配置 ;
 * @param {App} app
 * @return {*}
 * @author: Full
 */
export function setupRouter(app: App<Element>): void {
    app.use(router);
}

export default router;
