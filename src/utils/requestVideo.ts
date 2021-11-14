import axios from 'axios';
import { Toast } from 'vant';
import { Cache } from './localStorage';
import { NODE_ENV, API_VIDEO_URL } from './constants';
import { useStore } from '@/store';
import { loginActionTypes } from '@/store/modules/login/action-types';
import router from '@/router';
import qs from 'qs';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';  //参数需要用qs转化,可以在拦截器统一写 config.params
const service = axios.create({
    baseURL: NODE_ENV === 'kmdev' ? '/' : API_VIDEO_URL, // url = base url + request url //使用nginx代理，不需要请求地址
    // baseURL: '/',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true // send cookies when cross-domain requests
});

// Request interceptors
service.interceptors.request.use(
    async (config) => {
        // Add X-Access-Token header to every request, you can add other custom headers here
        const fpPromise = FingerprintJS.load();
        const fp = await fpPromise;
        const result = await fp.get();

        let Deviceid = result.visitorId; //获取设备ID
        const TouristUserToken = Cache.localGet('touristToken') || '';
        const TouristUserID = Cache.localGet('touristUserid') || '';
        const UserToken = Cache.localGet('token') || '';
        const UserID = Cache.localGet('userid') || '';
        const channelType = window.location.search.split('?webtype=')[1]; //渠道类型

        config.headers = {
            ...config.headers,
            token: UserToken || TouristUserToken,
            userid: UserID || TouristUserID,
            deviceid: Deviceid,
            channelid: channelType || 'H5',
        };

        // // 设置公共参数
        // config.params = {
        //     ...config.params,
        //     token: UserToken || TouristUserToken,
        //     userid: UserID || TouristUserID,
        //     deviceid: Deviceid,
        //     Referer: API_URL,
        // };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response interceptors
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        const store = useStore();
        if (res.code !== 200) {
            Toast.fail(res.msg || 'Error');

            switch (res.code) {
                //token失效
                case 8888:
                    Toast.fail(res.msg);

                    store.dispatch(loginActionTypes.DEL_TOKEN);

                    router.replace('/login');
                    break;

                default:
                    break;
            }
            Promise.reject(res.msg || new Error('错误：error'));
            return Promise.resolve(res);
        } else {
            return response.data;
        }
    },
    (error) => {
        const store = useStore();
        if (error.response) {
            let httpCode = error.response.status;

            if ([401, 403].includes(httpCode)) {
                // 返回 401,403 清除token信息并跳转到登录页面
                Toast.fail('请求错误,请重新登录');
                store.dispatch(loginActionTypes.DEL_TOKEN);
                router.replace('/login');
            } else if ([500, 502].includes(httpCode)) {
                Toast.fail('服务端错误，请稍后重试');
            } else {
                Toast.fail(error.message);
            }
        }
        return Promise.reject(error);
    },
);

export default service;
