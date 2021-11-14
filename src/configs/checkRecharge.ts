/**
 * @description:  检查充值状态;
 * @param {*}
 * @return {*}
 * @author: Full
 */
import { checkRechargeStatus } from '@/api/user';
import { Toast } from 'vant';

interface PaymsgItem {
    content: string;
}

export const checkRecharge = async () => {
    let result: any = await checkRechargeStatus();
    if (result.code === 0) {
        if (
            (result.data.new_message === 1 || result.data.new_notice === 1) &&
            result.data.paymsg.length > 0
        ) {
            result.data.paymsg.map((item: PaymsgItem) => {
                Toast.success(item.content);
            });
        }
    }
};
