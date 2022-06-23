/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-05-26 16:47:26
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-04 21:02:35
 * @Description: 
 */
import { AxiosPromise } from 'axios';
import service from '@/utils/service';
import { response_data_types } from '@/types/service';
import { config_types } from '@/types/api/config';
import { axiosOptions } from '@/utils/tools';

// 配置接口  
export const configApi = (): AxiosPromise<response_data_types<config_types>> => service(axiosOptions('Home.getConfig'));