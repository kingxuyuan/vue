<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-19 17:05:50
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-21 19:46:32
 * @Description: 
-->
<template>
    <div class="layout-navbar">
        <div class="layout-navbar-wrap" ref="wrap">
            <div class="navbar" ref="navbar" :style="{ transform: `translateX(-${left}px)` }">
                <div
                    class="navbar-item"
                    :class="{ active: item === $route.path }"
                    v-for="(item, idx) in navs"
                    @click="navbarClick(item)"
                    @contextmenu="onContextMenu($event, item, idx)"
                >
                    <div class="circle" v-if="item === $route.path"></div>
                    <span>{{ filterTitle(item) }}</span>
                    <div class="close">
                        <el-icon size="10">
                            <close />
                        </el-icon>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="contextmenu"
            v-if="contextMenu.show"
            :style="{ left: `${contextMenu.left}px`, width: `${contextMenu.width}px` }"
        >
            <div
                class="contextmenu-item"
                v-for="item in contextmenus"
                :key="item.id"
                @click="contextmenuClick(item)"
            >{{ item.title }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Close } from '@element-plus/icons-vue';
import { ref, reactive, watch, nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MENUS } from '@/router/authRouter';

interface contextmenus_types {
    id: number
    title: string
}

const route = useRoute();
const router = useRouter();
const wrap = ref<any>(null);
const left = ref(0);
const currentPath = ref(route.path);

let navbar = ref<any>([]);
let navs = ref(['/home']);

const contextMenu = reactive({
    left: 0,
    width: 90,
    show: false,
    path: ''
});

const contextmenus: contextmenus_types[] = [
    { id: 1, title: '关闭' },
    { id: 2, title: '关闭其他' },
    { id: 3, title: '关闭所有' }
]

const navbarClick = (path: string) => {
    router.push(path);
};

// 导航列表过滤
const routeFn = (arr: any[]): any[] => {
    return arr
        .map((item: any) => {
            if (item.children) {
                return routeFn(item.children.filter((item: any, index: number) => index > 0));
            }
            return {
                path: item.path,
                title: item.meta?.title
            };
        })
        .flat(Infinity);
};

// 过滤路由title
const filterTitle = (path: string): string => {
    const currentTitle: any = routeFn(MENUS).filter(item => item.path.includes(path))[0];
    return currentTitle?.title || '';
};

// 导航鼠标右击事件
const onContextMenu = (e: any, path: any, idx: number) => {
    e && e.preventDefault();
    if (idx === 0) return;

    contextMenu.show = true;
    contextMenu.path = path;

    let left = 0;
    if (window.innerWidth - e.clientX < contextMenu.width) left = e.clientX - contextMenu.width / 3 * 2;
    else left = e.clientX - contextMenu.width / 2;

    contextMenu.left = left;
}

// 隐藏 导航 子菜单
const hideContentextMenu = () => {
    contextMenu.show = false;
};

// 删除当前导航
const deleteRoute = (path: string) => {
    const idx = navs.value.indexOf(path);

    if (path === currentPath.value) {
        let path = '';
        if (!navs.value[idx + 1]) path = navs.value[idx - 1];
        else path = navs.value[idx + 1];
        router.push(path);
    };
    navs.value = [...navs.value.filter((item: any) => item !== path && path)]
};

// 导航 子菜单点击事件
const contextmenuClick = (item: contextmenus_types) => {
    switch (item.id) {
        case 1:
            deleteRoute(contextMenu.path);
            break;
        case 2:
            router.push(contextMenu.path);
            navs.value = navs.value.filter((n: any) => (n === '/home' || n === contextMenu.path) && n);
            break;
        default:
            navs.value = ['/home'];
            router.push('/home');
            break;
    }
}

onMounted(() => {
    document.body.addEventListener('click', hideContentextMenu);
})

watch(() => route.path, (path) => {
    if(['/', '/login'].includes(path)) {
        if (!navs.value.includes(path)) navs.value.push(path);
        currentPath.value = path;
    };
}, {
    immediate: true
});

watch(() => currentPath.value, (args) => {
    nextTick(() => {
        const wrapWidth = wrap.value?.offsetWidth;
        const navbarWidth = navbar.value?.offsetWidth;
        const navItem = navbar.value?.children[navs.value.indexOf(args)];
        let navItemLeft = navItem?.offsetLeft + navItem?.offsetWidth;

        if (navItemLeft - wrapWidth / 2 < 0) left.value = 0;
        else left.value = navItemLeft - wrap.value?.offsetWidth / 2;

        if (navItemLeft - wrapWidth / 2 > navbarWidth - wrapWidth) left.value = navbarWidth - wrapWidth;
    });
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
            padding: 3px 4px;
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
            span {
                font-size: 13px;
                white-space: nowrap;
            }
        }
        .active {
            color: #fff;
            border-color: #42b983;
            background-color: #42b983;
        }
    }
    .contextmenu {
        position: fixed;
        top: 80px;
        left: 230px;
        padding: 5px 0;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);

        &-item {
            padding: 8px 20px;
            font-size: 12px;
            cursor: pointer;
            text-align: left;
            &:hover {
                background-color: #eee;
            }
        }
    }
}
</style>