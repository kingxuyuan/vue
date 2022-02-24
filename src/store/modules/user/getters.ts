/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:07:54
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-19 15:00:22
 * @Description: 
 */
import { GetterTree } from 'vuex';
import { RootState } from '../../store';
import { State, UserInfoTypes } from './state';

export type Getters = {
    getterUserInfo(state: State): UserInfoTypes
}

export const getters: GetterTree<State, RootState> & Getters = {
    getterUserInfo: (state) => state.userInfo,
}