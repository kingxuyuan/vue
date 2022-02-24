<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-19 17:11:45
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 14:00:36
 * @Description: 
-->
<template>
    <div class="layout-header">
        <div class="layout-header-left">
            <h3>后台管理系统</h3>
        </div>
        <div class="layout-header-right">
            <ul>
                <li class="search">
                    <el-icon class="search-icon" size="18" @click="searcgClick">
                        <search />
                    </el-icon>
                    <div class="search-input" :style="{ width: `${showInput ? 200 : 0}px` }">
                        <el-input
                            v-model="keyword"
                            @blur="searcgClick"
                            clearable
                            placeholder="请输入搜索关键字"
                        />
                    </div>
                </li>
                <li class="notice">
                    <el-dropdown trigger="click" :hide-on-click="false" placement="bottom-end">
                        <el-icon size="18" color="#fff">
                            <bell />
                        </el-icon>
                        <div class="sup">99+</div>
                        <template #dropdown>
                            <el-dropdown-menu class="notice-tabs">
                                <el-dropdown-item>
                                    <el-tabs
                                        v-model="activeName"
                                        @tab-click="handleClick"
                                    >
                                        <el-tab-pane label="User" name="1">User</el-tab-pane>
                                        <el-tab-pane label="Conf" name="2">Conf</el-tab-pane>
                                        <el-tab-pane label="Role" name="3">Role</el-tab-pane>
                                        <el-tab-pane label="Task" name="4">Task</el-tab-pane>
                                    </el-tabs>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </li>
                <li class="avatar">
                    <el-dropdown @command="avatarhandleCommand">
                        <div class="avatar-name">
                            <span>{{ userInfo.name }}</span>
                            <img src="@/assets/images/avatar.gif" alt="头像" />
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu class="avatar-dropdown-menu">
                                <el-dropdown-item
                                    :command="item"
                                    v-for="item in dropdown"
                                >
                                    {{ item.title }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Search, Bell } from '@element-plus/icons-vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { CONFIG_MUTATIONS } from '@/store/modules/config/mutation-types';

interface dropdown_types {
    id: number
    title: string
    path: string
}

const store = useStore();
const router = useRouter();

const dropdown:dropdown_types[] = [
    { id: 1, title: '个人中心', path: '/mine' },
    { id: 2, title: '个人设置', path: '/home' },
    { id: 3, title: '退出登录', path: '' },
]

const keyword = ref('');
const showInput = ref(false);
const activeName = ref('1');
const userInfo = computed(() => store.getters.getterUserInfo);

const avatarhandleCommand = (command: dropdown_types) => {
    switch (command.id) {
        case 1:
            
            break;
        case 2:
            
            break;
        default:
            ElMessage.success('退出成功！');
            store.commit(CONFIG_MUTATIONS.CLEAR_TOKEN_MUTATION);
            router.replace('/login');
            break;
    }
}

const searcgClick = () => {
    if (keyword.value) {

    }
    else showInput.value = !showInput.value;
}

const handleClick = (tab: string, event: Event) => {
    console.log(tab, event)
}
</script>

<style lang="scss" scoped>
.layout-header {
    width: 100%;
    height: $header-height;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    background-color: #001529;
    @include flexCenterBetween();
    &-left,
    &-right {
        height: 100%;
        box-sizing: border-box;
    }
    &-left {
        padding-left: 24px;
        @include flexAlignCenter();
        h3 {
            color: #fff;
            letter-spacing: 2px;
        }
    }
    &-right {
        padding-right: 24px;
        @include flexCenterEnd();
        ul {
            height: 100%;
            @include flexAlignCenter();
            li {
                color: #fff;
                margin-left: 36px;
                :deep(.el-icon) {
                    cursor: pointer;
                    margin-top: 2px;
                }
            }
        }
        .avatar {
            cursor: pointer;
            &-name {
                color: #fff;
                @include flexAlignCenter();
            }
            img {
                width: 30px;
                height: 30px;
                margin-left: 10px;
                border-radius: 50%;
            }
        }
        .search {
            @include flexAlignCenter();
            &-input {
                max-width: 200px;
                margin-left: 8px;
                overflow: hidden;
                transition: width 0.3s;
                :deep(.el-input__inner) {
                    height: 26px;
                    line-height: 26px;
                }
            }
            &-icon {
                cursor: pointer;
            }
        }
        .notice {
            margin-left: 28px;
            position: relative;
            .sup {
                position: absolute;
                top: 0;
                right: 5px;
                color: #fff;
                font-size: $font-size-12;
                padding: 1px 6px;
                border-radius: 10px;
                background-color: red;
                transform: translateY(-50%) translate(100%);
            }
        }
    }
}
</style>

<style>
.avatar-dropdown-menu .el-dropdown-menu__item {
    min-width: 80px;
    padding-top: 6px;
    padding-bottom: 6px;
    justify-content: center;
}
.notice-tabs .el-dropdown-menu__item:hover {
    background-color: transparent;
}
.avatar-dropdown-menu .el-dropdown-menu__item:last-of-type {
    border-top: 1px solid #f0f0f0;
}
</style>