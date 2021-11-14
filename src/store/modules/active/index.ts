/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import {
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
    Module,
} from 'vuex';
import { RootState } from '../../index';
import { state } from './state';
import { mutations, Mutations } from './mutations';
import { actions, Actions } from './actions';
import { getters, Getters } from './getters';
import type { ActiveState } from './state';
export { ActiveState };

export type ActiveStore<S = ActiveState> = Omit<
    VuexStore<S>,
    'getters' | 'commit' | 'dispatch'
> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload?: P,
        options?: CommitOptions,
    ): ReturnType<Mutations[K]>;
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload?: Parameters<Actions[K]>[1],
        options?: DispatchOptions,
    ): ReturnType<Actions[K]>;
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>;
    };
};
export const store: Module<ActiveState, RootState> = {
    state,
    mutations,
    actions,
    getters,
};
