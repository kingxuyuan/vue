/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:07:47
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 13:22:52
 * @Description: 
 */
import { MutationTree } from 'vuex';
import { State, UserInfoTypes } from './state';
import { USRER_MUTATIONS } from './mutation-types';
import sessionCache from '@/utils/sessionCache';

export type Mutations<S = State> = {
    // 用户信息
    [USRER_MUTATIONS.SET_USERINFO_MUTATION](state: S, payload: UserInfoTypes): void
}

export const mutations: MutationTree<State> & Mutations = {
    // 用户信息
    [USRER_MUTATIONS.SET_USERINFO_MUTATION](state, payload) {
        sessionCache.sessionSet('userInfo', payload);
        state.userInfo = payload;
    },
}