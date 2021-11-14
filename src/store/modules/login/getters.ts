/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { GetterTree } from 'vuex';
import { LoginState } from './state';
import { RootState } from '../../index';

export type Getters = {
    getterToken(state: LoginState): string | null; //获取token
    getterIsLogin(state: LoginState): boolean; //是否登录
};

export const getters: GetterTree<LoginState, RootState> & Getters = {
    getterToken: (state) => state.login.token,
    getterIsLogin: (state) => !!state.login.token,
};
