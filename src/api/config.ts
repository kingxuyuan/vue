/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-06 22:31:02
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 02:11:59
 * @Description: config 接口
 */
import service from '@/utils/service';
import { HttpResponse } from '@/types/service';

export const configApi = (): Promise<HttpResponse> => service('/live', {
    params: {
        service: 'Home.getConfig'
    }
})