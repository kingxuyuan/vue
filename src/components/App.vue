<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-06-08 21:40:38
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-24 02:28:01
 * @Description: 
-->
<template>
    <router-view v-slot="{ Component }">
            <!-- <transition appear :name="transitionName"> -->
        <!-- <keep-alive :include="alives"> -->
            <component :is="Component" />
        <!-- </keep-alive> -->
        <!-- </transition> -->
    </router-view>
    <h1>333333333333</h1>
</template>

<script setup lang="ts">
import { computed } from "@vue/runtime-core";
import { useStore } from "@/store";

const store = useStore();
const config = computed(() => store.state.config);
console.log(config.value)
</script>

<style lang="scss" scoped>
.app {
}
</style>
