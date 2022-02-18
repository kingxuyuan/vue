<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 15:45:58
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-18 16:15:48
 * @Description: 
-->
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue';
import { watch, computed } from 'vue';
import { useStore } from '@/store';
import { CONFIG_ACTIONS } from '@/store/modules/config/action-types';

const store = useStore();
store.dispatch(CONFIG_ACTIONS.SET_CONFIG_ACTION);
const config = computed(() => store.getters.getterConfig)

ElMessage('this is a message.');
console.log(import.meta.env);

watch(() => config.value, (val) => {
    console.log(val);
    
})
</script>

<template>
    <el-button>I am ElButton</el-button>
    <img alt="Vue logo" src="@/assets/images/logo.png" />
    <img alt="Vue logo" src="./assets/images/logo.png" />
    <img alt="Vue logo" src="/img/logo.png" />
    <img alt="Vue logo" src="/img/1.jpg" width="300" />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />

    <router-view></router-view>

    <button @click="$router.push('/home')">去home页</button>
    <button @click="$router.push('/login')">去login页</button>
</template>

<style lang="scss">
#app {
    text-align: center;
    color: $text_color;
    background-color: #2c3e50;
    margin-top: 60px;
    transform: translateX(0);
}
</style>
