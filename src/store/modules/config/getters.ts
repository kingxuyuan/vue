/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-06 21:50:04
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 02:24:01
 * @Description: config getters 管理
 */
import { GetterTree } from 'vuex';
import { RootState } from '../../store';
import { ConfigState } from './state';
import { config_types } from '@/types/api/config';

export type Getters = {
    getterConfig(state: ConfigState): config_types;
};

export const getters: GetterTree<ConfigState, RootState> & Getters = {
    getterConfig: state => state.config
}