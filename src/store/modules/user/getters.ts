/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { GetterTree } from 'vuex';
import { UserState } from './state';
import { RootState } from '../../index';
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

export type Getters = {
    getterUserInfo(state: UserState): UserCenterInfoType;
    getterUserAmount(state: UserState): UserAmountType;
    getterCombo(state: UserState): ComboType;
    getterPayList(state: UserState): PaymentAllType;
    getterPayAmountList(state: UserState): RechargeAmountType;
    getterRecordRecharge(state: UserState): RecordRechargeType;
    getterWalletAd(state: UserState): WalletAdType;
    getterShareData(state: UserState): ShareQRdata;
    getterShareQRrecord(state: UserState): ShareQRrecord;
};

export const getters: GetterTree<UserState, RootState> & Getters = {
    getterUserInfo: (state) => state.user.data,
    getterUserAmount: (state) => state.user.amount,
    getterCombo: (state) => state.user.combo,
    getterPayList: (state) => state.user.payList,
    getterPayAmountList: (state) => state.user.payAmountList,
    getterRecordRecharge: (state) => state.user.RechargeRecord,
    getterWalletAd: (state) => state.user.walletAd,
    getterShareData: (state) => state.user.shareData,
    getterShareQRrecord: (state) => state.user.shareQRrecord,
};
