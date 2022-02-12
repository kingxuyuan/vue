/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:07:21
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-01-08 13:22:38
 * @Description: 
 */

import { config_response_types } from '@/types/config';

export type ConfigState = config_response_types;

export interface State {
    config: ConfigState
}

export const state: State = {
    config: {} as config_response_types
}