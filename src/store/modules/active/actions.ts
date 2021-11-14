import { ActionTree, ActionContext } from 'vuex';
import { activeActionTypes } from './action-types';
import { Mutations } from './mutations';
import { activeMutationTypes } from './mutation-types';
import { ActiveState } from './state';
import { RootState } from '../../index';
import { getActiveData } from '@/api/active';
import { Cache } from '@/utils/localStorage';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ActiveState, RootState>, 'commit'>;
export interface Actions {
    [activeActionTypes.GET_ACTIVEDATA]({
        commit,
    }: AugmentedActionContext): void;
}

export const actions: ActionTree<ActiveState, RootState> & Actions = {
    [activeActionTypes.GET_ACTIVEDATA]({ commit, state }) {
        commit(activeMutationTypes.SET_ACTIVEDATA, {
            ...state.active,
            loading: true,
            noResult: false,
        });
        getActiveData().then((res: any) => {
            if (res.code === 0) {
                commit(activeMutationTypes.SET_ACTIVEDATA, {
                    loading: false,
                    data: res.data,
                    noResult: Object.keys(res.data).length === 0,
                });
            }
        });
    },
};
