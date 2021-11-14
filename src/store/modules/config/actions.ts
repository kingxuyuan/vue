import { ActionTree, ActionContext } from 'vuex';
import { configActionTypes } from './action-types';
import { Mutations } from './mutations';
import { configMutationTypes } from './mutation-types';
import { ConfigState, PathInfoType } from './state';
import { RootState } from '../../index';
import { getConfig } from '@/api/config';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ConfigState, RootState>, 'commit'>;
export interface Actions {
    [configActionTypes.GET_CONFIG]({ commit }: AugmentedActionContext): void;
    [configActionTypes.GET_PATH](
        { commit }: AugmentedActionContext,
        path: PathInfoType,
    ): void;
}

export const actions: ActionTree<ConfigState, RootState> & Actions = {
    [configActionTypes.GET_CONFIG]({ commit, state }) {
        getConfig().then((res: any) => {
            res.code === 0 &&
                commit(configMutationTypes.TOGGLE_CONFIG, res.data);
        });
    },
    [configActionTypes.GET_PATH]({ commit, state }, path: PathInfoType) {
        commit(configMutationTypes.SET_PATH, path);
    },
};
