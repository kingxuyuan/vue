/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-19 19:02:43
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-19 14:55:49
 * @Description: local 读写
 */
import { encrypto, decrypto } from '@/utils/tool';
const ENV = import.meta.env.BASE_URL || '';

const localCache = {
    localGet: (key: string): any => {
        let newVal: any;
        try {
            const value = window.localStorage.getItem(key);
            if(value) newVal = ENV !== 'dev' ? JSON.parse(decrypto(value)) : JSON.parse(value);
            else newVal = '';
        } catch (error) {
            // console.log(error);
        }
        return newVal;
    },
    localSet: (key: string, value: any) => {
        if (!key) return;
        const newValue = ENV !== 'dev' ? encrypto(JSON.stringify(value)) : JSON.stringify(value);
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