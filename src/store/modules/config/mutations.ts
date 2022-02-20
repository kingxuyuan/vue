/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:07:47
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-19 15:05:48
 * @Description: 
 */
import { MutationTree } from 'vuex';
import { State } from './state';
import { CONFIG_MUTATIONS } from './mutation-types';
import { ConfigState } from './state';
import sessionCache from '@/utils/sessionCache';

export type Mutations<S = State> = {
    [CONFIG_MUTATIONS.SET_TOKEN_MUTATION](state: S, payload: string): void
    [CONFIG_MUTATIONS.SET_CONFIG_MUTATION](state: S, payload: ConfigState): void
}

export const mutations: MutationTree<State> & Mutations = {
    [CONFIG_MUTATIONS.SET_TOKEN_MUTATION](state, payload) {
        sessionCache.sessionSet('token', payload);
        state.token = payload;
    },
    [CONFIG_MUTATIONS.SET_CONFIG_MUTATION](state, payload) {
        state.config = payload;
    }
}