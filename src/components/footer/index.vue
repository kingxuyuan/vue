<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="km-footer">
        <div class="tabbar">
            <div class="tabbar-item" v-for="item in tabbar" :key="item.id">
                <router-link :to="item.path">
                    <img
                        :src="
                            $route.path === item.path
                                ? item.iconSelect
                                : item.icon
                        "
                        alt=""
                    />
                    <span :class="{ active: $route.path === item.path }">{{
                        item.name
                    }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import home from '@/assets/images/tabbar/home.png';
import homeSelect from '@/assets/images/tabbar/home_active.png';
import video from '@/assets/images/tabbar/video.png';
import videoSelect from '@/assets/images/tabbar/video_active.png';
import game from '@/assets/images/tabbar/game.png';
import gameSelect from '@/assets/images/tabbar/game_active.png';
import active from '@/assets/images/tabbar/active.png';
import activeSelect from '@/assets/images/tabbar/active_active.png';
import user from '@/assets/images/tabbar/mine.png';
import userSelect from '@/assets/images/tabbar/mine_active.png';

const tabbar = [
    { id: 1, name: '首页', path: '/home', icon: home, iconSelect: homeSelect },
    {
        id: 2,
        name: '短视频',
        path: '/shortVideo',
        icon: video,
        iconSelect: videoSelect,
    },
    { id: 3, name: '游戏', path: '/game', icon: game, iconSelect: gameSelect },
    {
        id: 4,
        name: '活动',
        path: '/active',
        icon: active,
        iconSelect: activeSelect,
    },
    { id: 5, name: '我的', path: '/user', icon: user, iconSelect: userSelect },
];

export default defineComponent({
    setup() {
        return {
            tabbar,
        };
    },
});
</script>

<style scoped lang="scss">
.km-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: $NavHeinght;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background: $color-background-white;
    @include flexCenter();
    .tabbar {
        width: 100%;
        height: 100%;
        @include flexCenter();
        &-item {
            flex: 1;
            a {
                width: 100%;
                height: 100%;
                @include flexColumnCenter();
                img {
                    width: 40px;
                }
                span {
                    margin-top: 8px;
                    font-size: 24px;
                    color: $color-text-d2d2d2;
                }
                .active {
                    color: $color-theme;
                }
            }
        }
    }
}
</style>
