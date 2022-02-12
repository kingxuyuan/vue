/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:07:54
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-01-08 13:23:15
 * @Description: 
 */
import { GetterTree } from 'vuex';
import { RootState } from '../../store';
import { State, ConfigState } from './state';

export type Getters = {
    getterConfig(state: State): ConfigState
}

export const getters: GetterTree<State, RootState> & Getters = {
    getterConfig: (state) => state.config
}