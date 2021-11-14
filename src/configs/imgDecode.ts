/*
 * @version:  ;
 * @description:  图片鉴权;
 * @autor: Full
 * @date: Do not edit
 */
import { getP } from '@/utils/maxRequests';
import { Decode } from './decode';
import { configure, forageStore } from '@/utils/cacheAdapter';

export const imgDecode = async (url: string) => {
    const base64Prefix = 'data:image/jpg;base64,';
    let path = Decode(url);
    let res: any = await configure(path.md5Path).then(async (api) => {
        const response = await api.get('');
        if (response.status === 200) {
            forageStore.setItem(url, base64Prefix + response.data);
            return response.data;
        } else {
            forageStore.setItem(url, null);
            return null;
        }
    });

    // let res: any = await getP(path.md5Path);

    return base64Prefix + res;
};
