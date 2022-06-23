/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-05-26 16:42:22
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-24 01:44:26
 * @Description: 
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const { VUE_APP_ENV } = process.env;

// generateReqKey：用于根据当前请求的信息，生成请求 Key
const generateReqKey = (config: AxiosRequestConfig) => {
    const { method, url, params, data } = config;
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&");
}
// addPendingRequest：用于把当前请求信息添加到 pendingRequest 对象中
export const pendingRequests = new Map();

const addPendingRequest = (config: AxiosRequestConfig) => {
    const requestKey = generateReqKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel: any) => {
        if (!pendingRequests.has(requestKey)) {
            pendingRequests.set(requestKey, cancel);
        }
    });
}
// removePendingRequest：检查是否存在重复请求，若存在则取消已发的请求
const removePendingRequest = (config: AxiosRequestConfig) => {
    const requestKey = generateReqKey(config);
    if (pendingRequests.has(requestKey)) {
        const cancelToken = pendingRequests.get(requestKey);
        cancelToken(requestKey);
        pendingRequests.delete(requestKey);
    }
}
// clearPending 清空 pending 中的请求（在路由跳转时调用）
export const clearPending = () => {
    for (const [requestKey, cancelToken] of pendingRequests) {
        cancelToken(requestKey)
    }
    pendingRequests.clear()
}


const service = axios.create({ // 联调 production
    baseURL: VUE_APP_ENV === 'dev' ? '' : 'VUE_APP_URL',
    timeout: 1500000,
});

service.interceptors.request.use((config: AxiosRequestConfig) => {
    // config.baseURL = import.meta.env.VUE_APP_URL + '/';
    removePendingRequest(config);   // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config);      // 把当前请求信息添加到pendingRequest对象中
    return config;
}, err => {
    // 这里出现错误可能是网络波动造成的，清空 pendingRequests 对象
    console.log("err: "+ err);
    pendingRequests.clear();
    return Promise.reject(err);
});

service.interceptors.response.use((res: AxiosResponse) => {
    removePendingRequest(res.config); // 从pendingRequest对象中移除请求
    if (res.status !== 200) {
        return res as any;
    } else {
        // if (res.data?.data?.code !== 0 && res.data?.data?.msg) Toast(res.data?.data.msg);

        return res.data;
    }
}, err => {
    removePendingRequest(err.config || {}); // 从pendingRequest对象中移除请求
    if (axios.isCancel(err)) {
        console.warn(err);
        return Promise.reject(err);
    } else {
        // 添加其它异常处理
    }
    return Promise.reject(err);
});

export default service;