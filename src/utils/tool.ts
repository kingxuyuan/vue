/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 17:05:28
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-01-05 17:06:39
 * @Description: 
 */
/**
 * @description: 动态获取图片
 * @param {string} url
 * @return {*}
 * @author: 大侠传授两招吧
 */
export const imageUrlFn = (url: string) => {
    const path = `./assets/images/${url}.png`;
    const modules = import.meta.globEager("./assets/images/*.png");

    return modules[path].default;
}