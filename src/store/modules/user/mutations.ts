/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { MutationTree } from 'vuex';
import { UserState } from './state';
import { userMutationTypes } from './mutation-types';
import {
    UserCenterInfoType,
    UserAmountType,
    ComboType,
    PaymentAllType,
    RechargeAmountType,
    RecordRechargeType,
    WalletAdType,
    ShareQRdata,
    ShareQRrecord,
} from '@/types/api/user';

export type Mutations<S = UserState> = {
    [userMutationTypes.SET_USERINFO](state: S, data: UserCenterInfoType): void;
    [userMutationTypes.SET_AMOUNT](state: S, data: UserAmountType): void;
    [userMutationTypes.SET_COMBO](state: S, data: ComboType): void;
    [userMutationTypes.SET_PAYLIST](state: S, data: PaymentAllType): void;
    [userMutationTypes.SET_PAYAMOUNTLIST](
        state: S,
        data: RechargeAmountType,
    ): void;
    [userMutationTypes.SET_RECORDRECHARGE](
        state: S,
        data: RecordRechargeType,
    ): void;
    [userMutationTypes.SET_WALLETAD](state: S, data: WalletAdType): void;
    [userMutationTypes.SET_SHAREQRDATA](state: S, data: ShareQRdata): void;
    [userMutationTypes.SET_SHAREQRDATARECORED](
        state: S,
        data: ShareQRrecord,
    ): void;
};

export const mutations: MutationTree<UserState> & Mutations = {
    [userMutationTypes.SET_USERINFO](
        state: UserState,
        data: UserCenterInfoType,
    ) {
        state.user.data = data;
    },
    [userMutationTypes.SET_AMOUNT](state: UserState, data: UserAmountType) {
        state.user.amount = data;
    },
    [userMutationTypes.SET_COMBO](state: UserState, data: ComboType) {
        state.user.combo = data;
    },
    [userMutationTypes.SET_PAYLIST](state: UserState, data: PaymentAllType) {
        state.user.payList = data;
    },
    [userMutationTypes.SET_PAYAMOUNTLIST](
        state: UserState,
        data: RechargeAmountType,
    ) {
        state.user.payAmountList = data;
    },
    [userMutationTypes.SET_RECORDRECHARGE](
        state: UserState,
        data: RecordRechargeType,
    ) {
        state.user.RechargeRecord = data;
    },
    [userMutationTypes.SET_WALLETAD](state: UserState, data: WalletAdType) {
        state.user.walletAd = data;
    },
    [userMutationTypes.SET_SHAREQRDATA](state: UserState, data: ShareQRdata) {
        state.user.shareData = data;
    },
    [userMutationTypes.SET_SHAREQRDATARECORED](
        state: UserState,
        data: ShareQRrecord,
    ) {
        state.user.shareQRrecord = data;
    },
};
