/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:06:52
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-01-08 12:14:20
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
});

export const setupStore = (app: App) => app.use(store);

export const useStore = (): Store => store as Store;