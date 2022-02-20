/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-19 13:24:31
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-20 16:13:25
 * @Description: 
 */
import { Location, Document } from '@element-plus/icons-vue';
const authRouter = [
    {
        path: '/',
        component: () => import('@/views/Layout/index.vue'),
        children: [
            {
                path: '',
                redirect: '/home',
            },
            {
                path: '/home',
                icon: Location,
                component: () => import(/* webpackChunkName: home */ '../views/Home.vue'),
                meta: {
                    auth: true,
                    title: '首页',
                }
            },
            {
                path: '/about',
                icon: Document,
                component: () => import(/* webpackChunkName: about */ '../views/about.vue'),
                meta: {
                    auth: true,
                    title: '关于',
                }
            },
            {
                path: '/error',
                icon: Document,
                component: () => import(/* webpackChunkName: error */ '../views/Error/index.vue'),
                meta: {
                    auth: true,
                    title: '错误',
                },
                children: [
                    {
                        path: '/error/error200',
                        icon: Document,
                        component: () => import(/* webpackChunkName: error200 */ '../views/Error/error200.vue'),
                        meta: {
                            auth: true,
                            title: '错误200',
                        }
                    },
                    {
                        path: '/error300',
                        icon: Document,
                        component: () => import(/* webpackChunkName: error200 */ '../views/Error/error300.vue'),
                        meta: {
                            auth: true,
                            title: '错误300',
                        }
                    },
                ]
            },
            {
                path: '/dabb',
                icon: Document,
                component: () => import(/* webpackChunkName: error */ '../views/Dabb/index.vue'),
                meta: {
                    auth: true,
                    title: 'dabb2',
                },
                children: [
                    {
                        path: '/error/dabb1',
                        icon: Document,
                        component: () => import(/* webpackChunkName: error200 */ '../views/Dabb/Dabb1.vue'),
                        meta: {
                            auth: true,
                            title: '错误200',
                        }
                    },
                    {
                        path: '/dabb2',
                        icon: Document,
                        component: () => import(/* webpackChunkName: error200 */ '../views/Dabb/Dabb2.vue'),
                        meta: {
                            auth: true,
                            title: '错误300',
                        }
                    },
                ]
            }
        ]
    },
];

export default authRouter;