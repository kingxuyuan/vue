import { ActionTree, ActionContext } from 'vuex';
import { userActionTypes } from './action-types';
import { Mutations } from './mutations';
import { userMutationTypes } from './mutation-types';
import { UserState } from './state';
import { RootState } from '../../index';
import {
    getUserCenterInfo,
    getUserAmount,
    getVipCombo,
    getPayment,
    getRechargeAmount,
    getRechargeRecord,
    getUserWalletAd,
    getShareQR,
    getShareQRrecord,
} from '@/api/user';
import { PayIdType, RecordParamsType } from '@/types/api/user';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserState, RootState>, 'commit'>;
export interface Actions {
    [userActionTypes.GET_USREINFO]({ commit }: AugmentedActionContext): void;
    [userActionTypes.GET_USREAMOUNT]({ commit }: AugmentedActionContext): void;
    [userActionTypes.GET_COMBO]({ commit }: AugmentedActionContext): void;
    [userActionTypes.GET_PAYLIST]({ commit }: AugmentedActionContext): void;
    [userActionTypes.GET_PAYAMOUNTLIST](
        { commit }: AugmentedActionContext,
        payid: PayIdType,
    ): void;
    [userActionTypes.GET_RECORDRECHARGE](
        { commit }: AugmentedActionContext,
        params: RecordParamsType,
    ): void;
    [userActionTypes.GET_NEWRECORDRECHARGE](
        { commit }: AugmentedActionContext,
        callback: () => void,
    ): void;
    [userActionTypes.GET_CLEARUSERINFO]({
        commit,
    }: AugmentedActionContext): void;
    [userActionTypes.GET_WALLETAD]({ commit }: AugmentedActionContext): void;
    [userActionTypes.GET_SHAREQRDATA]({ commit }: AugmentedActionContext): void;
    [userActionTypes.GET_SHAREQRDATARECORED]({
        commit,
    }: AugmentedActionContext): void;
}

export const actions: ActionTree<UserState, RootState> & Actions = {
    [userActionTypes.GET_USREINFO]({ commit, state }) {
        getUserCenterInfo().then((res: any) => {
            res.code === 0 && commit(userMutationTypes.SET_USERINFO, res.data);
        });
    },
    [userActionTypes.GET_USREAMOUNT]({ commit, state }) {
        getUserAmount().then((res: any) => {
            res.code === 0 && commit(userMutationTypes.SET_AMOUNT, res.data);
        });
    },
    [userActionTypes.GET_COMBO]({ commit, state }) {
        getVipCombo().then((res: any) => {
            res.code === 0 && commit(userMutationTypes.SET_COMBO, res.data);
        });
    },
    [userActionTypes.GET_PAYLIST]({ commit, state }) {
        getPayment().then((res: any) => {
            res.code === 0 && commit(userMutationTypes.SET_PAYLIST, res.data);
        });
    },
    [userActionTypes.GET_PAYAMOUNTLIST]({ commit, state }, payid: PayIdType) {
        getRechargeAmount(payid).then((res: any) => {
            res.code === 0 &&
                commit(userMutationTypes.SET_PAYAMOUNTLIST, res.data);
        });
    },
    [userActionTypes.GET_CLEARUSERINFO]({ commit, state }) {
        commit(userMutationTypes.SET_USERINFO, {} as any);
        commit(userMutationTypes.SET_AMOUNT, {} as any);
    },
    [userActionTypes.GET_RECORDRECHARGE](
        { commit, state },
        params: RecordParamsType,
    ) {
        commit(userMutationTypes.SET_RECORDRECHARGE, {
            data: {
                ...state.user.RechargeRecord.data,
            },
            loading: true,
            noresult: false,
        });
        getRechargeRecord(params).then((res: any) => {
            if (res.code === 0) {
                if (res.data.list.length === 0) {
                    commit(userMutationTypes.SET_RECORDRECHARGE, {
                        data: {
                            ...state.user.RechargeRecord.data,
                            list: [
                                ...state.user.RechargeRecord.data.list,
                                ...res.data.list,
                            ],
                        },
                        loading: false,
                        noresult: true,
                    });
                } else {
                    commit(userMutationTypes.SET_RECORDRECHARGE, {
                        data: {
                            ...state.user.RechargeRecord.data,
                            list: [
                                ...state.user.RechargeRecord.data.list,
                                ...res.data.list,
                            ],
                        },
                        loading: false,
                        noresult: false,
                    });
                }
            }
        });
    },
    [userActionTypes.GET_NEWRECORDRECHARGE](
        { commit, state },
        callback: () => void,
    ) {
        commit(userMutationTypes.SET_RECORDRECHARGE, {
            loading: false,
            data: {
                list: [],
            },
            noresult: false,
        } as any);
        callback();
    },
    [userActionTypes.GET_WALLETAD]({ commit, state }) {
        getUserWalletAd().then((res: any) => {
            res.code === 0 && commit(userMutationTypes.SET_WALLETAD, res.data);
        });
    },
    [userActionTypes.GET_SHAREQRDATA]({ commit, state }) {
        getShareQR().then((res: any) => {
            res.code === 0 &&
                commit(userMutationTypes.SET_SHAREQRDATA, res.data);
        });
    },
    [userActionTypes.GET_SHAREQRDATARECORED]({ commit, state }) {
        getShareQRrecord().then((res: any) => {
            if (res.code === 0 && res.data?.list.length > 0) {
                commit(userMutationTypes.SET_SHAREQRDATARECORED, res.data.list);
            }
        });
    },
};
