/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-06-03 22:29:46
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-04 04:27:06
 * @Description: 
 */
import { response_data_no_types } from 'service';

export interface user_info_types {
    avatar: string
    avatar_thumb: string
    coin: string
    id: string
    signature: string
    user_nicename: string
}

export interface user_request_params_types {
    uid: string
    token: string
}

export interface user_bonus_types {
    bonus_list: bonus_list_item_types[]
    count_day: string
}

export interface bonus_list_item_types {
    day: string 
    coin: string
}

export interface user_login_request_types {
    user_login: string
    user_pass: string
}

export interface user_login_payload_types extends user_login_request_types {
    callback: (params: response_data_no_types) => void
}