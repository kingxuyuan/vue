/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-06 21:36:17
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 01:16:08
 * @Description: config 状态管理
 */
import { Store as _Store, Module, CommitOptions, DispatchOptions } from 'vuex';
import { RootState } from '../../store';
import { state } from './state';
import { getters, Getters } from './getters';
import { actions, Actions } from './actions';
import { mutations, Mutations } from './mutations';
import type { ConfigState } from './state';
export { ConfigState };

export type ConfigStore<S = ConfigState> = Omit<_Store<S>, 'getters' | 'commit' | 'dispatch'> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>
} & {
    dispatch<K extends keyof Actions, P extends Parameters<Actions[K]>[1]>(
        key: K,
        payload?: P,
        options?: DispatchOptions
    ): ReturnType<Actions[K]>
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    }
}

const configStore: Module<ConfigState, RootState> = {
    state,
    actions,
    getters,
    mutations
}

export default configStore;