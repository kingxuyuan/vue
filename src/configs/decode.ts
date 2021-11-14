/*
 * @version:  ;
 * @description:  鉴权;
 * @autor: Full
 * @date: Do not edit
 */
import { imgAuthKey } from '@/utils/constants';
import { randomString, httpString, randomIntegerInRange } from '@/utils/tools';
import CryptoJS from 'crypto-js';

export const Decode = (url: string) => {
    const protocol = window.location.protocol;
    if (protocol.includes('https:')) {
        url = url.replace('http://', 'https://'); //地址替换https
    } else {
        url = url.replace('https://', 'http://'); //地址替换http
    }

    const dateTime = new Date().getTime();
    const timestamp = Math.floor(dateTime / 1000); //十进制（UNIX 时间戳
    const randomStr = randomString(20); //随机字符串
    const filePath = httpString(url); //文件路径
    const uid = randomIntegerInRange(100000000, 1000000000); //uid

    const md5hash = `${filePath}-${timestamp}-${randomStr}-${uid}-${imgAuthKey}`;
    // md5加密
    const md5decrypt = (keyStr: string) => {
        return CryptoJS.MD5(keyStr).toString();
    };
    let sign = `${timestamp}-${randomStr}-${uid}-${md5decrypt(md5hash)}`;
    let md5Path = `${url}?sign=${timestamp}-${randomStr}-${uid}-${md5decrypt(
        md5hash,
    )}`;

    return { md5Path, sign, url };
};
