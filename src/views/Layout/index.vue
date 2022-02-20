<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-19 15:17:02
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-20 18:18:08
 * @Description: 
-->
<template>
    <div class="layout">
        <Slider @collapse="collapseEmit" :isCollapse="isCollapse" />

        <div class="layout-content" :style="{ marginLeft: `${isCollapse ? 64 : 210}px` }">
            <div>
                <Header />

                <div class="layout-header-blank"></div>
                <Navbar :isCollapse="isCollapse" />

                <div class="layout-main">
                    <router-view />
                </div>

                <div class="layout-footer"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Slider from './Silder.vue';
import Header from './Header.vue';
import Navbar from './Navbar.vue';

const isCollapse = ref<boolean>(false);

const collapseEmit = () => {
    isCollapse.value = !isCollapse.value;
}

</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    .layout-content {
        min-height: 100vh;
        margin-left: 210px;
        transition: all 0.3s;
        position: relative;
        background-color: #f0f2f5;
    }
    .layout-header-blank {
        width: 100%;
        height: $header-height;
    }
    .layout-footer {
        width: 100%;
        height: $footer-height;
    }
    .layout-main {
        width: 100%;
        min-height: calc(100vh - $header-height - $navbar-height - $footer-height);
    }
}
</style>