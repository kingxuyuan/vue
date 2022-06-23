/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-05-26 17:41:24
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-04 22:41:36
 * @Description: config Mutations 管理
 */
import { ConfigState } from '../modules/config';
import { config_types } from '@/types/api/config';

export enum CONFIG_MUTATIONS {
    // config 接口配置
    SET_CONFIG_MUTATION = 'SET_CONFIG_MUTATION',
    // 主题颜色
    SET_THEME_MUTATION = 'SET_THEME_MUTATION',
}

export type Mutations<S = ConfigState> = {
    [CONFIG_MUTATIONS.SET_CONFIG_MUTATION](state: S, payload: config_types): void
    [CONFIG_MUTATIONS.SET_THEME_MUTATION](state: S, payload: string): void
}