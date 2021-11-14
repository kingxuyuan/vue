import request from '../utils/request';
import { AxiosPromise } from 'axios';
import {
    IndexRequestParams,
    RequestParamsType2,
    ResponseMoviesType1,
    ResponseMoviesType2,
} from '@/types/api/home';

// MovieType1 调用的接口
export const index = (
    params: IndexRequestParams,
): AxiosPromise<ResponseMoviesType1> =>
    request.post('/api/movie/index', params);

// MovieType2 调用的接口 首页类型页面
export const pageInfo = (
    params: RequestParamsType2,
): AxiosPromise<ResponseMoviesType2> =>
    request.post('/api/v2/module/page_info', params);
