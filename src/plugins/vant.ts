/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-09 13:31:57
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-11 01:11:02
 * @Description: vant 组件引入
 */
import { App } from 'vue';
import { Swipe, SwipeItem, NoticeBar, Icon   } from 'vant';

const Coms = [
    Swipe, 
    SwipeItem,
    NoticeBar,
    Icon 
]

export const setupVant = (app: App) => {
    Coms.forEach(item => {
        app.use(item);
    })
}