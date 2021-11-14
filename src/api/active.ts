/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import request from '../utils/request';
import { ActiveDataType } from '../types/api/active';
import { AxiosPromise } from 'axios';

//获取活动数据
export const getActiveData = (): AxiosPromise<ActiveDataType> =>
    request.post('/api/app/ggs');
