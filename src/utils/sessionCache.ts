/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-19 19:02:43
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-04 21:46:49
 * @Description: session 读写
 */
import { encrypto, decrypto } from '@/utils/tools';
const { VUE_APP_ENV } = process.env;

const sessionCache = {
    sessionGet: (key: string): any => {
        let newVal: any;
        try {
            let value = window.sessionStorage.getItem(key);
            if(value) newVal = VUE_APP_ENV !== 'dev' ? JSON.parse(decrypto(value)) : JSON.parse(value);
            else newVal = '';
        } catch (error) {
            // console.log(error);
        }
        return newVal;
    },
    sessionSet: (key: string, value: any) => {
        if (!key) return;
        const newValue = VUE_APP_ENV !== 'dev' ? encrypto(JSON.stringify(value)) : JSON.stringify(value);
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