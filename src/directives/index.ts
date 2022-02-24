/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-24 12:51:25
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 12:57:12
 * @Description: 注册全局指令
 */
import type { App } from 'vue';
import { setupWaterMarkDirectives } from './waterMark';

export const setupDirective = (app: App) => {
    setupWaterMarkDirectives(app);
};