/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-06 20:06:57
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 02:22:02
 * @Description: 全局状态管理
 */
import { config_types } from '@/types/api/config';

export interface ConfigState {
    config: config_types
}

export const state: ConfigState = {
    config: {} as config_types
}