import { AxiosPromise } from 'axios';

import request from '../utils/request';
import {
    ResponseSearchType,
    RequestTypes,
    ResponseSearchKeyWordsTypes,
} from '../types/api/search';

// 搜索热门标签
export const searchHot = (): AxiosPromise<ResponseSearchType> =>
    request.post('/api/app/hot_keywords');

// 关键字搜索
export const searchKeyWords = (
    params: RequestTypes,
): AxiosPromise<ResponseSearchKeyWordsTypes> =>
    request.post('/api/movie/search_v2', params);
