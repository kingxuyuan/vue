/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-06 20:12:31
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 02:21:44
 * @Description: config 接口类型定义
 */
interface LIVE_CLASS_Item {
    des: string
    id: number
    name: string
    thumb: string
}

export interface config_types {
    LIVE_CHAT_ANNOUNCEMENT: string
    LIVE_CLASS: LIVE_CLASS_Item[]
}