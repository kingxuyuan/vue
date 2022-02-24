/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:07:27
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 13:16:17
 * @Description: config 状态管理
 */
import { Module, Store, CommitOptions, DispatchOptions } from 'vuex';
import { RootState } from '../../store';
import { state } from './state';
import { Actions, actions } from './actions';
import { Getters, getters } from './getters';
import { Mutations, mutations } from './mutations';
import type { State as UserState } from './state';
export { UserState };

export type UserStore<S = UserState> = Omit<Store<S>, 'commit' | 'dispatsh' | 'getters'> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K, 
        payload?: P, 
        options?: CommitOptions
    ): ReturnType<Mutations[K]>
} & {
    commit<K extends keyof Actions, P extends Parameters<Actions[K]>[1]>(
        key: K,
        payload?: P,
        option?: DispatchOptions
    ): ReturnType<Actions[K]>
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    }
}

const store: Module<UserState, RootState> = {
    state,
    actions,
    getters,
    mutations
}

export default store;