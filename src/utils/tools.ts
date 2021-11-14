/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */

/**
 * @description: 判断设备 ;
 * @param {*}
 * @return {*}
 * @author: Full
 */

export function checkMobile() {
    if (
        window.navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
        )
    ) {
        return true; // 移动端
    } else {
        return false; // PC端
    }
}

/**
 * @description: 文档高度 ;
 * @param {*}
 * @return {*}
 * @author: Full
 */

export function getDocumentTop() {
    let bodyScrollTop = document.body ? document.body.scrollTop : 0;
    let documentScrollTop = document.documentElement
        ? document.documentElement.scrollTop
        : 0;
    return bodyScrollTop - documentScrollTop > 0
        ? bodyScrollTop
        : documentScrollTop;
}

/**
 * @description: 可视窗口高度 ;
 * @param {*}
 * @return {*}
 * @author: Full
 */
export function getWindowHeight() {
    let windowHeight = 0;

    if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

/**
 * @description: 滚动条滚动高度 ;
 * @param {*}
 * @return {*}
 * @author: Full
 */
export function getScrollHeight() {
    let bodyScrollHeight = document.body ? document.body.scrollHeight : 0;
    let documentScrollHeight = document.documentElement
        ? document.documentElement.scrollHeight
        : 0;
    return bodyScrollHeight - documentScrollHeight > 0
        ? bodyScrollHeight
        : documentScrollHeight;
}

/**
 * @Description:检查手机号  ;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export function isMobile(value: string): boolean {
    value = value.replace(/[^-|\d]/g, '');
    return (
        /^((\+86)|(86))?(1)\d{10}$/.test(value) ||
        /^0[0-9-]{10,13}$/.test(value)
    );
}

/**
 * @Description:  检查时间;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export function isDate(val: unknown): val is Date {
    return (
        Object.prototype.toString.call(val) === '[object Date]' &&
        !isNaN((val as Date).getTime())
    );
}

/**
 * @Description:  深度克隆;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */

export function isDef<T>(val: T): val is NonNullable<T> {
    return val !== undefined && val !== null;
}

export function deepClone<T extends Record<string, any> | null | undefined>(
    obj: T,
): T {
    if (!isDef(obj)) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => deepClone(item)) as unknown as T;
    }

    if (typeof obj === 'object') {
        const to = {} as Record<string, any>;
        Object.keys(obj).forEach((key) => {
            to[key] = deepClone(obj[key]);
        });

        return to as T;
    }

    return obj;
}

/**
 * @Description:  生成随机数范围;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export function range(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

/**
 * @Description:  返回指定范围内的随机整数;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export const randomIntegerInRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
// randomIntegerInRange(0, 5) -> 2

/**
 * @description: 检查是否是方法 ;
 * @param {any} obj
 * @return {*}
 * @author: Full
 */
export function isFunction(obj: any): obj is Function {
    return typeof obj === 'function';
}

/**
 * @description: 生产随机字符串 ;
 * @param {*} length
 * @return {*}
 * @author: Full
 */
export function randomString(length: number) {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i)
        result += str[Math.floor(Math.random() * str.length)];
    return result;
}

/**
 * @description:  截取协议域名;
 * @param {string} url
 * @return {*}
 * @author: Full
 */
export function httpString(url: string) {
    let pathFile = '';
    let sign = '://';
    let pathStr = '/'; //匹配斜杠个数,默认一个斜杠

    let copyUrl = url;
    if (url.indexOf(sign) > -1) {
        let domainFile = copyUrl
            .split('://')[1]
            .replace(/\/+/gi, function (i, g) {
                if (i.length >= 2) {
                    pathStr = i;
                }

                return '/';
            });

        if (domainFile.indexOf('/') > -1) {
            pathFile = pathStr + domainFile.split('/').slice(1).join('/');
            return pathFile;
        }
    }
}

// 过滤电影的类型
const MOVIE_TYPE: any = {
    1: '免费',
    3: 'VIP',
};
export const returnMovieType = (type?: number, price?: string): string => {
    let text = type && MOVIE_TYPE[type];
    if (!text) {
        text = '￥' + price;
    }
    return text;
};

/**
 * @description:  是否是网址;
 * @param {*}
 * @return {*}
 * @author: Full
 */

export const isHttpUrl = (url: string): boolean =>
    /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(
        url,
    );

/**
 * 数组中插入元素
 * @param arr
 * @param val
 * @param compare
 * @param maxLen
 */
export function insertArray<T>(
    arr: T[],
    val: T,
    compare: (item: T) => boolean,
    maxLen: number,
) {
    const index = arr.findIndex(compare);
    if (index === 0) return;
    if (index > 0) arr.splice(index, 1);
    arr.unshift(val);
    if (maxLen && arr.length > maxLen) arr.pop();
    return arr;
}

/**
 * 数组中删除元素
 * @param arr
 * @param compare
 */
export function deleteFromArray<T>(arr: T[], compare: (item: T) => boolean) {
    const index = arr.findIndex(compare);
    if (index > -1) arr.splice(index, 1);
    return arr;
}
