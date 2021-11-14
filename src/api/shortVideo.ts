/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import request from '../utils/requestVideo';
import {
    ShortVideoType,
    ShortVideoParamsType,
    ShortVideoAdType,
    ShortVideoAdTimeType,
    ShortVideoAdTimeParamsType,
} from '../types/api/shortVideo';
import { AxiosPromise } from 'axios';

//获取短视频
export const getShortVideoData = (
    params: ShortVideoParamsType,
): AxiosPromise<ShortVideoType> => request.post('/api/userVideoV3', params);

//短视频广告
export const getShortVideoAd = (): AxiosPromise<ShortVideoAdType> =>
    request.post('/api/videogg');

//统计短视频观看次数
export const getShortVideoTime = (
    params: ShortVideoAdTimeParamsType,
): AxiosPromise<ShortVideoAdTimeType> =>
    request.post('/api/isVideoData', params);
