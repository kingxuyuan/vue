/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-05-27 17:24:44
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-24 01:33:13
 * @Description: 
 */
// 开发 测试 环境
module.exports = function envUrlFn(config, env) {
    switch (env) {
        case 'prod':
            return config.prod;
        default:
            return config.dev;
    }
};