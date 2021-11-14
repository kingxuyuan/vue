import {
    UserCenterInfoType,
    UserAmountType,
    ComboType,
    PaymentAllType,
    RechargeAmountType,
    RecordRechargeType,
    RecordRechargeListItem,
    WalletAdType,
    ShareQRdata,
    ShareQRrecord,
    ShareQRrecordItem,
} from '@/types/api/user';

export interface UserStatusType {
    data: UserCenterInfoType;
    amount: UserAmountType;
    combo: ComboType;
    payList: PaymentAllType;
    payAmountList: RechargeAmountType;
    RechargeRecord: RecordRechargeType;
    walletAd: WalletAdType;
    shareData: ShareQRdata;
    shareQRrecord: ShareQRrecord;
}

export type UserState = {
    user: UserStatusType;
};

export const state: UserState = {
    user: {
        data: {},
        amount: {},
        combo: {},
        payList: {},
        payAmountList: {},
        RechargeRecord: {
            loading: false,
            data: {
                list: [] as RecordRechargeListItem[],
            },
            noresult: false,
        },
        walletAd: {},
        shareData: {},
        shareQRrecord: {
            list: [] as ShareQRrecordItem[],
        },
    } as UserStatusType,
};
