/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 15:45:58
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-01-07 19:51:24
 * @Description: 
 */
/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}
  
declare var ElMessage: any;

interface ImportMetaEnv {
    readonly VITE_KEY: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}