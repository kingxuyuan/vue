/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-05-26 16:20:59
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-23 22:37:02
 * @Description: {} 
 */
import { Module, ActionTree, MutationTree } from 'vuex';
import { RootState } from '@/store';
import { configApi } from '@/api/config';
import { config_types } from '@/types/api/config';
import { CONFIG_ACTIONS, Actions } from "../actions-types/config-actions";
import { CONFIG_MUTATIONS, Mutations } from "../mutations-types/config-mutations";
import sessionCache from '@/utils/sessionCache';

export interface ConfigState {
    token: string
    config: config_types,
    theme: string
}

interface _Module extends Module<ConfigState, RootState> {
    actions?: ActionTree<ConfigState, RootState> & Actions
    mutations?: MutationTree<ConfigState> & Mutations;
}

const state = {
    token: '',
    config: {} as config_types,
    theme: sessionCache.sessionGet('theme') || 'orange',
}

export const configStore: _Module = {
    state,
    actions: {
        [CONFIG_ACTIONS.FETCH_CONFIG_ACTION]: async ({ commit }) => {
            try {
                const res = await configApi();
                if (res.data.code === 0) commit(CONFIG_MUTATIONS.SET_CONFIG_MUTATION, res.data.info[0]);
            } catch (err) {
                console.log(err);
            }
        }
    },
    mutations: {
        [CONFIG_MUTATIONS.SET_CONFIG_MUTATION]: (state, payload) => {
            state.config = payload;
        },
        // 主题颜色
        [CONFIG_MUTATIONS.SET_THEME_MUTATION]: (state, payload) => {
            sessionCache.sessionSet('theme', payload);
            state.theme = payload;
            // 给根节点设置data-theme属性，切换主题色就是修改data-theme的值，这里data=dark/light
            window.document.documentElement.setAttribute('data-theme', payload);
        },
    }
}