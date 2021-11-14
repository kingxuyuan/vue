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
import type { PlayerState } from './state';
export { PlayerState };

export type PlayerStore<S = PlayerState> = Omit<
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
export const store: Module<PlayerState, RootState> = {
    state,
    mutations,
    actions,
    getters,
};
