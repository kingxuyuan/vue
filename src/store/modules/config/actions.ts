/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:07:40
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-01-08 14:13:49
 * @Description: 
 */
import { ActionTree, ActionContext } from 'vuex';
import { RootState } from '../../store';
import { State } from './state';
import { Mutations } from './mutations';
import { CONFIG_ACTIONS } from './action-types';
import { CONFIG_MUTATIONS } from './mutation-types';

import { configApi } from '@/api/config';

type argmentedActionsContext = {
    commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export type Actions = {
    [CONFIG_ACTIONS.SET_CONFIG_ACTION]({ commit }: argmentedActionsContext, params: any): void
}

export const actions: ActionTree<State, RootState> & Actions = {
    async [CONFIG_ACTIONS.SET_CONFIG_ACTION]({state, commit}, params){
        try {
            const res: any = await configApi();
            commit(CONFIG_MUTATIONS.SET_CONFIG_MUTATION, res);
        } catch (error) {
            
        }
    }
}