/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-06 19:26:40
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 01:22:13
 * @Description: vuex 状态管理
 */
import { App } from 'vue';
import { createStore } from 'vuex';
import { Store } from './store';
import config from './modules/config';

const store = createStore({
    modules: {
        config
    }
})

export const setupStore = (app: App) => {
    app.use(store);
}

export const useStore = (): Store => {
    return store as Store;
}