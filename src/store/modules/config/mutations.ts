/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-06 21:06:30
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 02:22:05
 * @Description: config mutation 管理
 */
import { MutationTree } from 'vuex';
import { ConfigState } from './state';
import { CONFIG_MUTATION } from './mutation-types';
import { config_types } from '@/types/api/config';

export type Mutations<S = ConfigState> = {
    [CONFIG_MUTATION.SET_CONFIG_MUTATION](state: S, payload: config_types): void
}

export const mutations: MutationTree<ConfigState> & Mutations = {
    [CONFIG_MUTATION.SET_CONFIG_MUTATION](state, payload) {
        state.config = payload
    }
}