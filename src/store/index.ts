/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:06:52
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 13:17:54
 * @Description: vuex 状态管理
 */
import { App } from 'vue';
import { createStore } from 'vuex';
import { Store } from './store';
import config from './modules/config';
import user from './modules/user';

const store = createStore({
    modules: {
        config,
        user
    }
});

export const setupStore = (app: App) => app.use(store);

export const useStore = (): Store => store as Store;