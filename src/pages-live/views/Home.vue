<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-06-08 22:49:41
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-09 14:10:57
 * @Description: 
-->
<template>
    <div class="home">
        <h1>Live 页面</h1>
        <br />
        <a href="/">Home页面</a>
        <br>
        <a href="live?id=25">直播25</a>
        <br>
        <a href="live?id=63">直播63</a>
        <div class="app"></div>
    </div>
</template>

<script setup lang="ts">
import { watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const route = useRoute();
watch(() => route, (r) => {
console.log(r);

},{
    immediate:true
});
</script>

<style lang="scss" scoped>
.home {
    a {
        display: flex;
    }
}
</style>