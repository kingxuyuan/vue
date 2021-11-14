/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import request from '../utils/request';
import { InitUserinfoType } from '../types/api/global';
import { AxiosPromise } from 'axios';

// 获取配置
export const getInitUserInfo = (): AxiosPromise<InitUserinfoType> =>
    request.post('/api/app/init_userinfo');
