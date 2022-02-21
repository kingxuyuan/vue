<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-19 16:48:25
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-21 19:26:03
 * @Description: 
-->
<template>
    <div class="layout-silder" :style="{ width: `${isCollapse ? 64 : 210}px` }">
        <div class="layout-silder-top"></div>
        <div class="layout-silder-content">
            <el-scrollbar>
                <el-menu
                    :collapse="isCollapse"
                    :default-active="activeIndex"
                    :unique-opened="true"
                    router
                >
                    <SilderMenu :menus="menus" />
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout-silder-bottom">
            <div class="fold" @click="foldClick">
                <el-icon size="24" v-if="isCollapse">
                    <expand />
                </el-icon>
                <el-icon size="24" v-else>
                    <fold />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Fold, Expand } from '@element-plus/icons-vue';

import SilderMenu from '@/components/SilderMenu.vue';
import { MENUS } from '@/router/authRouter';

defineProps({
    isCollapse: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['collapse']);

const route = useRoute();
const activeIndex = ref('');

const menus = MENUS.map((item, idx) => {
    let childrenArr: any[] = [];
    if (item.children) childrenArr = item.children.filter((item, index) => index > 0);
    return {
        ...item,
        children: childrenArr
    }
});

const foldClick = () => {
    emit('collapse');
};

watch(() => route.path, (val) => {
    if (val) activeIndex.value = val;
}, {
    immediate: true
})
</script>

<style lang="scss" scoped>
.layout-silder {
    position: fixed;
    top: 0;
    left: 0;
    width: 210px;
    height: 100%;
    background-color: #fff;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    transition: all 0.3s;
    &-top {
        width: 100%;
        height: $header-height;
    }
    &-bottom {
        width: 100%;
        height: 40px;
        padding-right: 20px;
        box-sizing: border-box;
        border-top: 1px solid #f0f0f0;
        @include flexCenterEnd();
        .fold {
            cursor: pointer;
        }
    }
    &-content {
        width: 100%;
        height: calc(100% - 40px - $header-height);
    }
    :deep(.el-menu) {
        border-right: none;
    }
    :deep(.is-active .el-sub-menu__title) {
        color: #409eff;
    }
}
</style>