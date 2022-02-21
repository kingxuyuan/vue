/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-19 13:24:15
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-21 20:11:13
 * @Description: 
 */

// 白名单
const whiteRouter = [
    { 
        name: 'Login',
        path: '/login', 
        component: () => import(/* webpackChunkName: login */ '../views/Login.vue'),
        meta: {
            title: '登录页',
        } 
    },
    { 
        name: 'NotFound',
        path: '/:pathMatch(.*)', 
        component: () => import(/* webpackChunkName: notFound */ '@/views/NotFound.vue'),
        meta: {
            title: '页面404',
        } 
    },
];

export default whiteRouter;