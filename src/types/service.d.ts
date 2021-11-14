/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-06 23:33:02
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-10-06 23:33:02
 * @Description: 接口响应通过格式
 */

export interface HttpResponse {
    status: number
    statusText: string
    data: {
        code: number
        desc: string
        [key: string]: any
    }
}