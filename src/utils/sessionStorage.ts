/**
 * @description: sessionStorage ;
 * @param {*}
 * @return {*}
 * @author: Full
 */

export const sessionCache = {
    sessionGet(key: string) {
        return JSON.parse(window.sessionStorage.getItem(key) || 'null');
    },
    sessionSet(key: string, value: any) {
        if (!value) {
            return;
        }
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    sessionRemove(key: string) {
        window.sessionStorage.removeItem(key);
    },
    sessionClear() {
        window.sessionStorage.clear();
    },
};

export default sessionCache;
