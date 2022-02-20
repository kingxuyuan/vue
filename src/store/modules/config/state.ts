/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:07:21
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-19 15:05:13
 * @Description: 
 */

import sessionCache from '@/utils/sessionCache';
import { config_response_types } from '@/types/config';

export type ConfigState = config_response_types;

export interface State {
    token: string
    config: ConfigState
}

export const state: State = {
    token: sessionCache.sessionGet('token') || '',
    config: {} as config_response_types
}