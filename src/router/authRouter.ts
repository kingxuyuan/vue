/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-19 13:24:31
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-21 20:00:11
 * @Description: 
 */
import { Location, Document } from '@element-plus/icons-vue';
const authRouter = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: Layout */ '@/views/Layout/index.vue'),
        children: [
            {
                path: '',
                redirect: '/home',
            },
            {
                name: 'Home',
                path: '/home',
                icon: Location,
                component: () => import(/* webpackChunkName: home */ '../views/Home.vue'),
                meta: {
                    auth: true,
                    title: '首页',
                }
            },
            {
                name: 'About',
                path: '/about',
                icon: Document,
                component: () => import(/* webpackChunkName: about */ '../views/about.vue'),
                meta: {
                    auth: true,
                    title: '关于',
                }
            },
            {
                name: 'Error',
                path: '/error',
                icon: Document,
                component: () => import(/* webpackChunkName: error */ '../views/Error/index.vue'),
                meta: {
                    auth: true,
                    title: '错误',
                },
                children: [
                    {
                        path: '',
                        redirect: '/error200'
                    },
                    {
                        name: 'Error200',
                        path: '/error200',
                        icon: Document,
                        component: () => import(/* webpackChunkName: error200 */ '../views/Error/error200.vue'),
                        meta: {
                            auth: true,
                            title: '错误200',
                        }
                    },
                    {
                        name: 'Error300',
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
                name: 'Dabb',
                path: '/dabb',
                icon: Document,
                component: () => import(/* webpackChunkName: error */ '../views/Dabb/index.vue'),
                meta: {
                    auth: true,
                    title: 'dabb2',
                },
                children: [
                    {
                        path: '',
                        redirect: '/dabb1'
                    },
                    {
                        name: 'Dabb1',
                        path: '/dabb1',
                        icon: Document,
                        component: () => import(/* webpackChunkName: error200 */ '../views/Dabb/Dabb1.vue'),
                        meta: {
                            auth: true,
                            title: 'dabb1',
                        }
                    },
                    {
                        name: 'Dabb2',
                        path: '/dabb2',
                        icon: Document,
                        component: () => import(/* webpackChunkName: error200 */ '../views/Dabb/Dabb2.vue'),
                        meta: {
                            auth: true,
                            title: 'dabb2',
                        }
                    },
                ]
            }
        ]
    },
];

export const MENUS = authRouter[0].children.filter((item, idx) => idx > 0);

export default authRouter;