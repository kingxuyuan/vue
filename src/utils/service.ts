/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:59:04
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-01-08 14:13:23
 * @Description: axios
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const service = axios.create({
    baseURL: '',
    timeout: 15000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
    
    
    return config;
}, err => {

})

service.interceptors.response.use((res: AxiosResponse) => {
    if(res.status === 200) {
        if(res.data?.code === 200) return res.data?.data;
        
    }
}, err => {

})

export default service;