/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-19 19:02:43
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-19 15:04:57
 * @Description: session 读写
 */
import { encrypto, decrypto } from '@/utils/tool';
const ENV = import.meta.env.BASE_URL || '';

const sessionCache = {
    sessionGet: (key: string): any => {
        let newVal: any;
        try {
            let value = window.sessionStorage.getItem(key);
            if(value) newVal = ENV !== 'dev' ? JSON.parse(decrypto(value)) : JSON.parse(value);
            else newVal = '';
        } catch (error) {
            // console.log(error);
        }
        return newVal;
    },
    sessionSet: (key: string, value: any) => {
        if (!key) return;
        const newValue = ENV !== 'dev' ? encrypto(JSON.stringify(value)) : JSON.stringify(value);
        window.sessionStorage.setItem(key, newValue);
    },
    sessionRemove: (key: string) => {
        window.sessionStorage.removeItem(key);
    },
    sessionClear() {
        window.sessionStorage.clear();
    }
}

export default sessionCache;