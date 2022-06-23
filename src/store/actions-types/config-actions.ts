/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-05-26 17:41:24
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-04 22:37:16
 * @Description: config Actions 管理
 */
import { ActionContext } from 'vuex';
import { RootState } from '@/store';
import { ConfigState } from '../modules/config';
import { Mutations } from "../mutations-types/config-mutations";
import { config_types } from '@/types/api/config';

type argmentedActionsContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload?: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<ConfigState, RootState>, 'commit'>;

export enum CONFIG_ACTIONS {
    FETCH_CONFIG_ACTION = 'FETCH_CONFIG_ACTION'
}


export type Actions = {
    [CONFIG_ACTIONS.FETCH_CONFIG_ACTION]: ({ commit }: argmentedActionsContext, payload: config_types) => void,
}