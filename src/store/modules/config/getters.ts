/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:07:54
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-19 15:00:22
 * @Description: 
 */
import { GetterTree } from 'vuex';
import { RootState } from '../../store';
import { State, ConfigState } from './state';

export type Getters = {
    getterConfig(state: State): ConfigState
    getterToken(state: State): string
}

export const getters: GetterTree<State, RootState> & Getters = {
    getterConfig: (state) => state.config,
    getterToken: (state) => state.token
}