/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-06-23 23:23:49
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-24 01:39:09
 * @Description: 
 */
/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare var process: {
    env: {
        NODE_ENV: string
        BASE_URL: string
        VUE_APP_ENV: string
        VUE_APP_PLATFORM_URL: string
        VUE_APP_PLATFORM_CONFIG: string
    }
}