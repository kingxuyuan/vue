/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:09:37
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-18 16:13:07
 * @Description: 
 */
import { ConfigState, ConfigStore } from './modules/config';

export interface RootState {
    config: ConfigState
}

export type Store = ConfigStore<Pick<RootState, 'config'>>