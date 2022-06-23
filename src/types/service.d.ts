/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-05-26 14:02:20
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-04 03:43:29
 * @Description: 
 */
export interface response_types {
    msg: string
    ret: number
    data: object
}

export interface response_data_no_types {
    code: number
    msg: string
    info: any[]
}

export interface response_data_types<D> {
    code: number
    msg: string
    info: D[]
}