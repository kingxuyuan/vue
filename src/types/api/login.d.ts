export interface LoginType {
    account: string;
    avatar: string;
    is_visitor: number;
    mobile: string;
    new_vip: number;
    nick_name: string;
    promo_code: string;
    reg_sms: string;
    sex: number;
    token: string;
    user_id: string;
    vip_expire_time: number;
}

export interface LoginAccountType {
    account: string;
    password: string;
    mix: number;
}

export interface LoginSuccessType {
    loginSuccess: () => void;
}
export interface LoginMobileType {
    mobile: number | string;
    verify_code: number | string;
}

export interface SendCodeType {
    global_area_code: number;
    mobile: number | string;
    operate: number;
}

export interface frogetPawFromType {
    mobile: number | string;
    verify_code: number | string;
    new_password: string;
    secondPassword: string;
}

export interface UserAgreementType {
    content: string;
}

export interface RegisterParamsType {
    account: string;
    password: string;
    promo_code: string;
}

export interface RegisterType {
    is_visitor: number;
}
export interface RegisterSuccessType {
    registerSuccess: (val: any) => void;
}

export interface BindMobileParamsType {
    mobile: number | string;
    verify_code: number | string;
}
