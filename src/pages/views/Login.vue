<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-06-08 22:07:09
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-08 23:02:14
 * @Description: 
-->
<template>
    <div class="login">
        <h1>登录页</h1>
        <router-link to="/">返回首页</router-link><br>
        <a href="live">返回直播详情页面</a>
        <button @click="back">返回直播详情页面</button>
   </div>
</template>

<script setup lang="ts">
const back = () => {
    location.href = 'live?id=22';
}
</script>

<style lang="scss" scoped>
.login{

}
</style>