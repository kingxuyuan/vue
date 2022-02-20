<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-19 17:05:50
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-20 19:55:37
 * @Description: 
-->
<template>
    <div class="layout-navbar">
        <div class="layout-navbar-wrap" ref="wrap">
            <div class="navbar" ref="navbar" :style="{ transform: `translateX(-${left}px)` }">
                <div
                    class="navbar-item"
                    :class="{ active: idx === activeIndex }"
                    v-for="(item, idx) in navs"
                    @click="navbarClick(idx)"
                >
                    <div class="circle" v-if="idx === activeIndex"></div>
                    <span>{{ item.id }}</span>
                    <div class="close">
                        <el-icon size="10">
                            <close />
                        </el-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Close } from '@element-plus/icons-vue';
import { ref, reactive, watch } from 'vue';

const wrap = ref<any>(null);
const navbar = ref<any>(null);
const navs = reactive([
    { id: 1, title: '' },
    { id: 2, title: '' },
    { id: 3, title: '' },
    { id: 4, title: '' },
    { id: 5, title: '' },
    { id: 6, title: '' },
    { id: 7, title: '' },
    { id: 8, title: '' },
    { id: 9, title: '' },
    { id: 10, title: '' },
    { id: 11, title: '' },
    { id: 12, title: '' },
    { id: 13, title: '' },
    { id: 14, title: '' },
    { id: 15, title: '' },
    { id: 16, title: '' },
    { id: 17, title: '' },
    { id: 18, title: '' },
    { id: 19, title: '' },
    { id: 21, title: '' },
    { id: 22, title: '' },
    { id: 23, title: '' },
    { id: 24, title: '' },
    { id: 25, title: '' },
]);
const left = ref(0);
const activeIndex = ref(1);

const navbarClick = (idx: number) => {
    activeIndex.value = idx;
}

watch(() => activeIndex.value, (val) => {
    const wrapWidth = wrap.value?.offsetWidth;
    const navbarWidth = navbar.value?.offsetWidth;
    const navItem = navbar.value?.children[activeIndex.value];
    let navItemLeft = navItem?.offsetLeft + navItem?.offsetWidth;

    if (navItemLeft - wrapWidth / 2 < 0) left.value = 0;
    else left.value = navItemLeft - wrap.value?.offsetWidth / 2;

    if (navItemLeft - wrapWidth / 2 > navbarWidth - wrapWidth) left.value = navbarWidth - wrapWidth;
});


</script>

<style lang="scss" scoped>
.layout-navbar {
    position: sticky;
    top: 50px;
    left: 0;
    width: 100%;
    height: $navbar-height;
    padding: 0 16px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 2px 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    &-wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .navbar {
        width: fit-content;
        height: 100%;
        @include flexAlignCenter();
        transition: all 0.3s;
        &-item {
            min-width: 54px;
            cursor: pointer;
            padding: 1px 0;
            border-radius: 3px;
            border: 1px solid #d8dce5;
            @include flexCenter();

            &:not(:first-child) {
                margin-left: 14px;
            }
            .circle {
                width: 8px;
                height: 8px;
                margin-right: 4px;
                border-radius: 50%;
                background-color: #fff;
            }
            .close {
                width: 16px;
                height: 16px;
                margin-left: 4px;
                border-radius: 50%;
                overflow: hidden;
                transition: all 0.3s;
                @include flexCenter();
                &:hover {
                    color: #fff;
                    background-color: #b4bccc;
                }
            }
        }
        .active {
            color: #fff;
            border-color: #42b983;
            background-color: #42b983;
        }
    }
}
</style>