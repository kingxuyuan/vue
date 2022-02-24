/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:07:40
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 13:32:19
 * @Description: 
 */
import { ActionTree, ActionContext } from 'vuex';
import { RootState } from '../../store';
import { State, UserInfoTypes } from './state';
import { Mutations } from './mutations';
import { USER_ACTIONS } from './action-types';
import { USRER_MUTATIONS } from './mutation-types';

type argmentedActionsContext = {
    commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export type Actions = {
    [USER_ACTIONS.SET_USER_ACTION]({ commit }: argmentedActionsContext, params: UserInfoTypes): void
}

export const actions: ActionTree<State, RootState> & Actions = {
    async [USER_ACTIONS.SET_USER_ACTION]({state, commit}, params){
        console.log(params);
        
        commit(USRER_MUTATIONS.SET_USERINFO_MUTATION, params);
    }
}