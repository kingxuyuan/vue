/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { MutationTree } from 'vuex';
import { LoginState } from './state';
import { loginMutationTypes } from './mutation-types';
import { LoginStatusType } from './state';

export type Mutations<S = LoginState> = {
    [loginMutationTypes.TOGGLE_LOGIN](state: S, login: LoginStatusType): void;
    [loginMutationTypes.TOGGLE_LOGOUT](state: S, login: LoginStatusType): void;
};

export const mutations: MutationTree<LoginState> & Mutations = {
    [loginMutationTypes.TOGGLE_LOGIN](
        state: LoginState,
        login: LoginStatusType,
    ) {
        state.login = login;
    },
    [loginMutationTypes.TOGGLE_LOGOUT](
        state: LoginState,
        login: LoginStatusType,
    ) {
        state.login = login;
    },
};
