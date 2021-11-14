/**
 * @description: localStorage ;
 * @param {*}
 * @return {*}
 * @author: Full
 */

export const Cache = {
    localGet(key: string) {
        return JSON.parse(window.localStorage.getItem(key) || 'null');
    },
    localSet(key: string, value: any) {
        if (!value) {
            return;
        }
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    localRemove(key: string) {
        window.localStorage.removeItem(key);
    },
    localClear() {
        window.localStorage.clear();
    },
};

export default Cache;
