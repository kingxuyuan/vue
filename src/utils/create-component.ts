/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
import { App } from 'vue';
import Image from '@/components/base/images/index.vue';
import Header from '@/components/header/index.vue';
export function setupComponent(app: App) {
    app.component('v-image', Image);
    app.component('v-header', Header);
}
