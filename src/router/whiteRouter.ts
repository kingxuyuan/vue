/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-19 13:24:15
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-19 13:30:57
 * @Description: 
 */

// 白名单
const whiteRouter = [
    { 
        path: '/login', 
        title: '登录页',
        component: () => import(/* webpackChunkName: Login */ '../views/Login.vue'),
        meta: {
            title: '登录页',
        } 
    },
];

export default whiteRouter;