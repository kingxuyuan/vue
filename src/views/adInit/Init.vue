<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="km-init">
        <div class="close-iocn">{{ seconds }}</div>
        <div class="swipe">
            <van-swipe
                class="swipe-box"
                :autoplay="3000"
                indicator-color="white"
            >
                <van-swipe-item
                    v-for="item in bannerData.start_page"
                    :key="item.id"
                >
                    <div @click="closeInit" class="swipe-image">
                        <router-link :to="`/iframe?src=${item.url.trim()}`">
                            <v-image :src="item.pic" />
                        </router-link>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted, computed, watch } from 'vue';
import { Cache } from '@/utils/localStorage';
import { useStore } from '@/store';
import { configMutationTypes } from '@/store/modules/config/mutation-types';

export default defineComponent({
    setup() {
        const store = useStore();
        const seconds = ref(5); //5秒关闭
        const time = ref();
        const bannerData = computed(() => store.state.config.config.data);
        const showStart = computed(() => store.getters.getterShowStart);

        const setInit = () => {
            time.value = setInterval(() => {
                seconds.value -= 1;
                if (seconds.value <= 0) {
                    closeInit();
                }
            }, 1000);
        };
        const closeInit = () => {
            Cache.localSet('showInit', 1);
            store.commit(configMutationTypes.SET_SHOWINIT, false);
            clearInterval(time.value);
        };

        watch(
            () => showStart.value,
            (val) => {
                if (!val) {
                    setInit();
                }
            },
        );

        onUnmounted(() => {
            time.value && clearInterval(time.value);
        });
        return {
            bannerData,
            seconds,
            closeInit,
        };
    },
});
</script>

<style scoped lang="scss">
.km-init {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    background: #fff;
    @include flexColumnCenter();
    font-size: 40px;
    font-weight: 800;
    .close-iocn {
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        width: 70px;
        height: 70px;
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 1;
        border-radius: 50%;
        @include flexCenter();
    }
    .swipe {
        width: 100%;
        height: 100%;
        .swipe-box {
            width: 100%;
            height: 100%;
            color: #fff;
            font-size: 20px;
            line-height: 150px;
            text-align: center;
            background: $color-background-theme;

            a,
            img,
            .swipe-image {
                width: 100%;
                height: 100%;
                display: block;
            }
            img {
                object-fit: cover;
            }
        }
    }
}
</style>
