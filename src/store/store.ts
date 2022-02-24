/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:09:37
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 13:17:44
 * @Description: 
 */
import { ConfigState, ConfigStore } from './modules/config';
import { UserState, UserStore } from './modules/user';

export interface RootState {
    config: ConfigState
    user: UserState
}

export type Store = 
    ConfigStore<Pick<RootState, 'config'>> &
    UserStore<Pick<RootState, 'user'>>