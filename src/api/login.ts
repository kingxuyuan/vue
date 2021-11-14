/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import request from '../utils/request';
import { AxiosPromise } from 'axios';
import {
    LoginAccountType,
    LoginType,
    SendCodeType,
    LoginMobileType,
    frogetPawFromType,
    UserAgreementType,
    RegisterType,
    RegisterParamsType,
    BindMobileParamsType,
} from '@/types/api/login';
// 账号密码登录
export const userLogin = (params: LoginAccountType): AxiosPromise<LoginType> =>
    request.post('/api/member_new/login', params);

// 发送验证码
export const sendCode = (params: SendCodeType): AxiosPromise<LoginType> =>
    request.post('/api/app/send_sms_code', params);

// 验证码登录
export const userLoginMobile = (
    params: LoginMobileType,
): AxiosPromise<LoginType> =>
    request.post('/api/member_new/login_mobile', params);

// 忘记密码
export const forgetPassword = (params: frogetPawFromType) =>
    request.post('/api/obinfo/forget_password', params);

//获取用户协议

export const getUserAgreement = (): AxiosPromise<UserAgreementType> =>
    request.post('/api/app/get_user_agreement');

//用户注册
export const userRegister = (
    params: RegisterParamsType,
): AxiosPromise<RegisterType> => request.post('/api/member_new/reg', params);

//绑定手机号
export const bindMobileNumber = (params: BindMobileParamsType) =>
    request.post('/api/member_new/bind_mobile', params);
