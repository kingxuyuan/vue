/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-10-09 16:01:18
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-10-09 19:12:27
 * @Description: babel 配置
 */
module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        [
            'import',
            {
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true,
            },
        ],
    ],
};