<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 15:45:58
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-25 18:06:02
 * @Description: 
-->
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue';
import { watch, computed, onMounted } from 'vue';
import { useStore } from '@/store';
import { CONFIG_ACTIONS } from '@/store/modules/config/action-types';
import listenerDevtools from '@/utils/ListenerDevtools';

const store = useStore();
store.dispatch(CONFIG_ACTIONS.SET_CONFIG_ACTION);
const config = computed(() => store.getters.getterConfig)

// ElMessage('this is a message.');
// console.log(import.meta.env);

watch(() => config.value, (val) => {
    console.log(val);

});

const imgBase64 = (imgsrc: string) => {
    const image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.src = imgsrc;
    image.onload = function() {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context: any = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        const url = canvas.toDataURL("image/png"); //得到图片的base64编码数据+
        localStorage.setItem('img', url);
    };
};
imgBase64('https://img2.baidu.com/it/u=2937803703,3095540904&fm=26&fmt=auto&gp=0.jpg');
// imgs.value = localStorage.getItem('img') || '';

onMounted(() => {
    // 禁止打开控制台
    // listenerDevtools();
});
</script>

<template>
    <!-- <el-button>I am ElButton</el-button> -->
    <!-- <img alt="Vue logo" src="@/assets/images/logo.png" />
    <img alt="Vue logo" src="./assets/images/logo.png" />
    <img alt="Vue logo" src="/img/logo.png" />
    <img alt="Vue logo" src="/img/1.jpg" width="300" />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->

    <router-view />
    <!-- <button @click="$router.push('/home')">去home页</button>
    <button @click="$router.push('/login')">去login页</button>-->
</template>

<style lang="scss">
#app {
    text-align: center;
}
</style>
