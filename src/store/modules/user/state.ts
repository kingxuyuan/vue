/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-08 12:07:21
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 13:32:52
 * @Description: 
 */

import sessionCache from '@/utils/sessionCache';

export interface UserInfoTypes {
    name: string
}

export interface State {
    userInfo: UserInfoTypes
}

export const state: State = {
    userInfo: sessionCache.sessionGet('userInfo') || {}
}