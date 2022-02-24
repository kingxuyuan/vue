/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-24 12:55:53
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 13:42:10
 * @Description: 
 */
import { App, computed } from 'vue';
import { useStore } from '@/store';
import setWaterMark from '@/utils/watermark';

export const setupWaterMarkDirectives = (app: App) => {
    /**
     * @description: 
     * @param {*} watermark
     * @param {*} el
     * @param {*} binding 
        instance：使用指令的组件实例。
        value：传递给指令的值。例如，在 v-my-directive="1 + 1" 中，该值为 2。
        oldValue：先前的值，仅在 beforeUpdate 和 updated 中可用。值是否已更改都可用。
        arg：参数传递给指令 (如果有)。例如在 v-my-directive:foo 中，arg 为 "foo"。
        modifiers：包含修饰符 (如果有) 的对象。例如在 v-my-directive.foo.bar 中，修饰符对象为 {foo: true，bar: true}。
        dir：一个对象，在注册指令时作为参数传递。例如，在以下指令中：
     * @param {*} vnode
     * @return {*}
     * @author: 大侠传授两招吧
     */    
    app.directive('watermark', (el, binding, vnode) => {
        const store = useStore();
        const userInfo = computed(() => store.getters.getterUserInfo);
        
        setWaterMark(el, userInfo.value.name);
    });
}