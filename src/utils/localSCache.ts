/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-19 19:02:43
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-04 21:46:46
 * @Description: local 读写
 */
import { encrypto, decrypto } from '@/utils/tools';
const { VUE_APP_ENV } = process.env;

const localCache = {
    localGet: (key: string): any => {
        let newVal: any;
        try {
            const value = window.localStorage.getItem(key);
            if(value) newVal = VUE_APP_ENV !== 'dev' ? JSON.parse(decrypto(value)) : JSON.parse(value);
            else newVal = '';
        } catch (error) {
            // console.log(error);
        }
        return newVal;
    },
    localSet: (key: string, value: any) => {
        if (!key) return;
        const newValue = VUE_APP_ENV !== 'dev' ? encrypto(JSON.stringify(value)) : JSON.stringify(value);
        window.localStorage.setItem(key, newValue);
    },
    localRemove: (key: string) => {
        window.localStorage.removeItem(key);
    },
    localClear() {
        window.localStorage.clear();
    }
}

export default localCache;