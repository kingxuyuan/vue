/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-07 00:46:36
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-10-09 19:12:03
 * @Description: postcss 配置
 */
const postcssPxtorem = require('postcss-pxtorem');
module.exports = {
    plugins: [
        postcssPxtorem({
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75;
            },
            propList: ['*'],
        }),
    ],
};