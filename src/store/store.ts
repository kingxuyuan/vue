/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-06 21:07:04
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 01:23:03
 * @Description: vuex 状态
 */
import { ConfigState, ConfigStore } from './modules/config';

export interface RootState {
    config: ConfigState
}

export type Store = ConfigStore<Pick<RootState, 'config'>>