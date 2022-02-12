/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 13:03:14
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-01-08 13:34:56
 * @Description: 
 */
import service from '@/utils/service';

// 配置接口
export const configApi = () => service.post('/api/configs', {}, { backCode: true } as any);