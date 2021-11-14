export interface UserCenterInfoType {
    account: string;
    avatar: string;
    bind_ob: number;
    channelid: string;
    chart_url: string;
    discount_num: number;
    expire_time: string;
    expire_time1: number;
    global_area_code: string;
    id: number;
    is_avatar: number;
    is_comment: number;
    is_deleted: number;
    is_new_feedback: number;
    is_new_message: number;
    is_nick_name: number;
    is_save_qrcode: number;
    is_sex: number;
    is_today_click_adv: number;
    is_vip: number;
    is_visitor: number;
    level_id: number;
    mobile: string;
    nick_name: string;
    ob_name: string;
    promo_code: string;
    promo_qrcode: string;
    re_today_cache_times: number;
    re_today_view_times: number;
    reg_promo_code: number;
    sex: number;
    status: number;
    today_cache_times: number;
    today_view_times: number;
    token: string;
    video_clip_daily_view_times: number;
    vip_hint: string;
}

export interface UserAmountType {
    amount: string;
    obamount: string;
}

export interface updateNickNameType {
    nick_name: string;
}

export interface ComboInfoType {
    cover: string;
    id: number;
    sub_title: string;
    title: string;
}
export interface ComboVipType {
    cheap: number;
    month_price: string;
    price: number;
    type: number;
    vip_text: string;
}
export interface ComboType {
    info: ComboInfoType[];
    vip: ComboVipType[];
}

export interface VipBuyType {
    type: number;
}

interface PayListItemType {
    id: number;
    info: string;
    logo: string;
    show_name: string;
    type: number;
}

interface ChatListItemType {
    nick_name: string;
    qq: string;
    qq_qrcode: string;
    weixin: string;
    weixin_qrcode: string;
}
export interface PaymentAllType {
    list: Array<PayListItemType & ChatListItemType>;
    payqq: string;
}

interface RechargeAmountItemType {
    id: number;
    price: number;
    price_give: number;
    price_per: number;
}

export interface RechargeAmountType {
    list: RechargeAmountItemType[];
}

export interface PayIdType {
    payid: number;
}

export interface PayParamsType {
    payid: number | string;
    amount: number | string;
}

export interface PayResultType {
    url: string;
}

export interface RecordParamsType {
    page: number;
    type: number;
    row: number;
}

export interface RecordRechargeListItem {
    addtime: string;
    amount: string;
    status: number;
    type: number;
}
export interface RecordRechargeType {
    loading: boolean;
    data: {
        sum: number;
        count: number;
        give: number;
        list: RecordRechargeListItem[];
    };
    noresult: boolean;
}

interface WalletAdItem {
    id: number;
    linkType: number;
    pic: string;
    title: string;
    url: string;
}
export interface WalletAdType {
    list: WalletAdItem[];
}

export interface ShareQRdata {
    promo_links: string;
    promo_code: string;
    promo_qrcode: string;
}

interface ShareQRrecordItem {
    account: string;
    content: string;
    create_time: string;
    id: number;
}
export interface ShareQRrecord {
    list: ShareQRrecordItem[];
}
