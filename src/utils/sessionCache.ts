/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-19 19:02:43
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-14 17:43:06
 * @Description: session 读写
 */
const sessionCache = {
    sessionGet: (key: string): any => {
        let value = window.sessionStorage.getItem(key) || '{}';
        if(value === '[object Object]') value = '{}';
        return JSON.parse(value);
    },
    sessionSet: (key: string, value: any) => {
        if(!key) return;
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }, 
    sessionRemove: (key: string) => {
        window.sessionStorage.removeItem(key);
    },
    sessionClear() {
        window.sessionStorage.clear();
    }
}

export default sessionCache;