/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import request from '../utils/request';
import {
    UserCenterInfoType,
    updateNickNameType,
    VipBuyType,
    ComboType,
    PaymentAllType,
    PayIdType,
    RechargeAmountType,
    PayParamsType,
    PayResultType,
    RecordParamsType,
    RecordRechargeType,
    WalletAdType,
    ShareQRdata,
    ShareQRrecord,
} from '../types/api/user';
import { AxiosPromise } from 'axios';

// 获取用户信息
export const getUserCenterInfo = (): AxiosPromise<UserCenterInfoType> =>
    request.post('/api/member/index');

// 获取金额
export const getUserAmount = (): AxiosPromise<UserCenterInfoType> =>
    request.post('/api/v2/line_pay/amount');

// 修改昵称
export const updateNickName = (params: updateNickNameType) =>
    request.post('/api/member/update_nick_name', params);

//选择VIP套餐
export const getVipCombo = (): AxiosPromise<ComboType> =>
    request.post('/api/vip/index');

//VIP购买
export const getVipBuy = (params: VipBuyType) =>
    request.post('/api/vip/buy', params);

//获取支付方式
export const getPayment = (): AxiosPromise<PaymentAllType> =>
    request.post('/api/line_pay/allpay');

//获取充值金额
export const getRechargeAmount = (
    params: PayIdType,
): AxiosPromise<RechargeAmountType> =>
    request.post('/api/line_pay/payprice', params);

//查询充值是否到账
export const checkRechargeStatus = () => request.post('/api/member/newmessage');

//充值支付
export const payRechargeAmount = (
    params: PayParamsType,
): AxiosPromise<PayResultType> => request.post('/api/line_pay/pay', params);

//充值记录
export const getRechargeRecord = (
    params: RecordParamsType,
): AxiosPromise<RecordRechargeType> =>
    request.post('/api/line_pay/log', params);

// 钱包广告
export const getUserWalletAd = (): AxiosPromise<WalletAdType> =>
    request.post('/api/home/km_adv');

//获取分享二维码
export const getShareQR = (): AxiosPromise<ShareQRdata> =>
    request.post('/api/member/promote_param');

//获取推广记录
export const getShareQRrecord = (): AxiosPromise<ShareQRrecord> =>
    request.post('/api/member/promo_list_v3');
