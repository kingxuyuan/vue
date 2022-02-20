<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-20 13:12:28
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-20 16:24:35
 * @Description: 
-->
<template>
    <template v-for="item in menus">
        <el-sub-menu :index="item.path" v-if="item?.children?.length > 0">
            <template #title>
                <el-icon v-if="item.icon">
                    <component :is="item.icon" />
                </el-icon>
                <span>{{ item?.meta?.title }}</span>
            </template>
            <SilderMenu :menus="item?.children" />
        </el-sub-menu>

        <el-menu-item :index="item.path" v-else>
            <el-icon v-if="item.icon">
                <component :is="item.icon" />
            </el-icon>
            
            <template #title>{{ item?.meta?.title }}</template>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';

defineProps({
    menus: {
        type: Array as PropType<any>,
        default() {
            return [];
        },
    }
});
</script>