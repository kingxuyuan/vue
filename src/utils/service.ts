/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-06 22:32:17
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-10-07 00:25:13
 * @Description: axios 请求封装
 */
import qs from "qs";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const { VUE_APP_ENV, VUE_APP_API_URL } = process.env;

// 状态码
const STATUS_CODE = {
    400: '请求错误',
    401: '未授权，请重新登录',
    403: '拒绝访问',
    404: '请求出错',
    408: '请求超时',
    500: '服务器错误',
    501: '服务未实现',
    502: '网络错误',
    503: '服务不可用',
    504: '网络超时',
    505: 'HTTP版本不受支持',
}

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config 
 */
const addPending = (config: AxiosRequestConfig) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data)
    ].join('&')
    config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
        if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
            pending.set(url, cancel)
        }
    })
}
/**
 * 移除请求
 * @param {Object} config 
 */
const removePending = (config: AxiosRequestConfig) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data)
    ].join('&')
    if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
        const cancel = pending.get(url)
        cancel(url)
        pending.delete(url)
    }
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
    for (const [url, cancel] of pending) {
        cancel(url)
    }
    pending.clear()
}

const service = axios.create({ // 联调 production
    baseURL: VUE_APP_ENV === 'development' ? '/' : VUE_APP_API_URL,
    timeout: 15000,
    // headers: {
    //     get: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //     },
    //     post: {
    //         'Content-Type': 'application/json;charset=utf-8'
    //     }
    // },
    // 是否跨站点访问控制请求
    // withCredentials: true,
    // transformRequest: [(data) => {
    //     data = JSON.stringify(data)
    //     return data
    // }],
    // validateStatus() {
    //     // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    //     return true
    // },
    // transformResponse: [(data) => {
    //     if (typeof data === 'string' && data.startsWith('{')) {
    //         data = JSON.parse(data)
    //     }
    //     return data
    // }]
})

// 添加请求拦截器
service.interceptors.request.use((config: AxiosRequestConfig | any) => {
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    // config.headers['token'] = 'token';
    config.headers['Cache-Control'] = 'no-cache, no-store' // 清除缓存
    // config.headers['Pragma'] = 'no-cache' // 清除缓存

    // 设置公共参数
    // config.params = { device: equipment };

    return config;
}, error => {
    // 错误抛到业务代码
    //   error.data = {}
    //   error.data.msg = '服务器异常，请联系管理员！'
    return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use((res: AxiosResponse) => {
    // removePending(res) // 在请求结束后，移除本次请求
    return res.data;
}, error => {
    if (axios.isCancel(error)) {
        console.log('repeated request: ' + error.message)
    } else {
        // handle error code
        // 错误抛到业务代码
        error.data = {}
        error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
    }
    return Promise.reject(error)
})

export default service;