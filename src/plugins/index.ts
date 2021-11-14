/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { steupVideoPlugin } from './video';
import { steupVantPlugin } from './vant';
import { setupLazyPlugin } from './lazy';
import type { App } from 'vue';

export const steupPlugin = (app: App) => {
    // steupVideoPlugin(app);
    steupVantPlugin(app);
    // setupLazyPlugin(app); //不使用，用vant lazy
};
