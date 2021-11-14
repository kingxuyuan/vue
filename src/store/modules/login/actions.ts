import { ActionTree, ActionContext } from 'vuex';
import { loginActionTypes } from './action-types';
import { Mutations } from './mutations';
import { loginMutationTypes } from './mutation-types';
import { LoginState } from './state';
import { RootState } from '../../index';
import { Cache } from '@/utils/localStorage';
import { userLogin, userLoginMobile, userRegister } from '@/api/login';
import { ClearLoginState } from '@/configs/permission';
import {
    LoginAccountType,
    LoginType,
    LoginMobileType,
    LoginSuccessType,
    RegisterSuccessType,
    RegisterParamsType,
} from '@/types/api/login';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload?: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<LoginState, RootState>, 'commit'>;
export interface Actions {
    [loginActionTypes.SET_TOKEN](
        { commit }: AugmentedActionContext,
        params: LoginAccountType & LoginSuccessType,
    ): void;
    [loginActionTypes.SET_MOBILE_TOKEN](
        { commit }: AugmentedActionContext,
        params: LoginMobileType & LoginSuccessType,
    ): void;
    [loginActionTypes.DEL_TOKEN](
        { commit }: AugmentedActionContext,
        callback?: () => void,
    ): void;
    [loginActionTypes.SET_REGISTER](
        { commit }: AugmentedActionContext,
        params: RegisterParamsType & RegisterSuccessType,
    ): void;
}

export const actions: ActionTree<LoginState, RootState> & Actions = {
    [loginActionTypes.SET_TOKEN]({ commit, state }, params) {
        const { loginSuccess, ...rest } = params;
        userLogin({ ...rest, mix: 0 }).then((res: any) => {
            if (res.code === 0) {
                Cache.localSet('token', res.data.token);
                Cache.localSet('userid', res.data.user_id);
                Cache.localSet('loginInfo', res.data);
                commit(loginMutationTypes.TOGGLE_LOGIN, {
                    token: res.data.token,
                });
                loginSuccess();
            }
        });
    },
    [loginActionTypes.SET_MOBILE_TOKEN]({ commit, state }, params) {
        const { loginSuccess, ...rest } = params;
        userLoginMobile(rest).then((res: any) => {
            if (res.code === 0) {
                Cache.localSet('token', res.data.token);
                Cache.localSet('userid', res.data.user_id);
                Cache.localSet('loginInfo', res.data);
                commit(loginMutationTypes.TOGGLE_LOGIN, {
                    token: res.data.token,
                });
                loginSuccess();
            }
        });
    },
    [loginActionTypes.DEL_TOKEN]({ commit, state }, callback) {
        ClearLoginState();
        commit(loginMutationTypes.TOGGLE_LOGIN, {
            token: null,
        });
        callback && callback();
    },
    [loginActionTypes.SET_REGISTER]({ commit, state }, params) {
        const { registerSuccess, ...rest } = params;
        userRegister(rest).then((res: any) => {
            if (res.code === 0) {
                Cache.localSet('token', res.data.token);
                Cache.localSet('userid', res.data.user_id);
                Cache.localSet('loginInfo', res.data);
                commit(loginMutationTypes.TOGGLE_LOGIN, {
                    token: res.data.token,
                });
                registerSuccess(res.data);
            }
        });
    },
};
