//定义全局配置的常量

const { VUE_APP_API_URL, VUE_APP_ENV, VUE_APP_VIDEO_API_URL } = process.env;

export const NODE_ENV: string = VUE_APP_ENV; //process.env.NODE_ENV; // 环境变量

export const API_URL: string = VUE_APP_API_URL; // 接口 url

export const API_VIDEO_URL: string = VUE_APP_VIDEO_API_URL; //短视频 url

export const imgAuthKey = 'yuc1g1j0wsmliwkj19vtswem'; //图片鉴权key
