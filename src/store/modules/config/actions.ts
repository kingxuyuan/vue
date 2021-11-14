/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-06 21:05:57
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 02:22:22
 * @Description: config actions 管理
 */
import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '../../store';
import { ConfigState } from './state';
import { CONFIG_ACTIONS } from './actions-types';
import { Mutations } from './mutations';
import { CONFIG_MUTATION } from './mutation-types';
import { configApi } from '@/api/config';

type argmentedActionsContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload?: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<ConfigState, RootState>, 'commit'>

export type Actions = {
    [CONFIG_ACTIONS.SET_CONFIG_ACTIONS]({ commit }: argmentedActionsContext): void
}

export const actions: ActionTree<ConfigState, RootState> & Actions = {
    async [CONFIG_ACTIONS.SET_CONFIG_ACTIONS]({ commit }) {
        const res: any = await configApi();
        
        if (res?.ret === 200 && res?.data?.code === 0) {
            commit(CONFIG_MUTATION.SET_CONFIG_MUTATION, res?.data?.info[0])
        }
    }
}