/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-05-26 14:02:20
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-03 15:00:49
 * @Description: 
 */
export interface userInfo_types {
    name: string
    age: number
}

export interface swiper_types {
    items: swiper_item_types[]
    position: string
}
// 轮播图
export interface swiper_item_types {
    content: string
    description: string
    id: string
    image: string
    more: null
    slide_id: string
    target: string
    title: string
    url: string
}

// 推荐直播响应数据 接口
export interface live_response_types {
    data: live_item_type[],
    loading: boolean
    nodata: boolean
}
// 推荐直播
export interface live_item_type {
    avatar_thumb: string
    city: string
    id: string
    isvideo: string
    match_id: string
    pull: string
    pull_h5: string
    starttime: string
    stream: string
    thumb: string
    title: string
    uid: string
    user_nicename: string
    viewnum: number
}