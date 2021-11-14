/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import 'video.js/dist/video-js.css'; // 引入video.js的css
import hls from 'videojs-contrib-hls'; // 播放hls流需要的插件
import type { App } from 'vue';

export const steupVideoPlugin = (app: App) => {
    app.use(hls);
};
