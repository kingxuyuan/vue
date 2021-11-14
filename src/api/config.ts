import request from '../utils/request';
import { ResponseConfigType } from '../types/api/config';
import { AxiosPromise } from 'axios';

// 获取配置
export const getConfig = (): AxiosPromise<ResponseConfigType> =>
    request.post('/api/app/getConfigV1');
