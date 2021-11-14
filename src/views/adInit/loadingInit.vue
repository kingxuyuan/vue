<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="loading-init">
        <div class="loading-init-content">
            <div class="init-splash">
                <img
                    :src="channelBg[channelType]"
                    alt=""
                    :class="channelType"
                />
            </div>
            <div class="init-slogo">
                <img src="@/assets/images/init/init-slogo.png" alt="" />
            </div>
            <div class="init-load">
                <van-loading class="van-loading" color="#f99c10"
                    >加载中... &nbsp;{{ seconds }}%</van-loading
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    reactive,
    onUnmounted,
    toRefs,
    computed,
    watch,
} from 'vue';
import { useStore } from '@/store';
import { Cache } from '@/utils/localStorage';
import { randomIntegerInRange } from '@/utils/tools';
import { configMutationTypes } from '@/store/modules/config/mutation-types';
import mitao from '@/assets/images/init/init-mitao.png';
import kumi from '@/assets/images/init/init-kumi.png';

export default defineComponent({
    setup() {
        const store = useStore();
        const channelType =
            window.location.search.split('?webtype=')[1] || 'h5kumi'; //渠道类型
        const channelBg = {
            //渠道背景图
            h5mitao: mitao,
            h5kumi: kumi,
        };
        const data = reactive({
            time: null as any,
            sTime: null as any,
            seconds: 0,
            secondsInterval: 10, //10s启动时间
        });

        const isLoadData = computed(() => store.getters.getterIsLoadHome);

        onMounted(() => {
            data.sTime = setInterval(() => {
                if (data.seconds >= 85) {
                    data.seconds = 99;
                } else {
                    data.seconds += 10 + randomIntegerInRange(1, 4);
                }
                data.secondsInterval -= 1;
                if (data.secondsInterval <= 0) {
                    clearInterval(data.sTime);
                }
            }, 1000);
        });

        watch(
            () => isLoadData.value,
            (val) => {
                if (val) {
                    data.time = setTimeout(() => {
                        store.commit(configMutationTypes.SET_SHOWSTART, false);
                        Cache.localSet('showStart', 1);
                    }, 1000);
                }
            },
        );

        onUnmounted(() => {
            data.time && clearTimeout(data.time);
            data.sTime && clearInterval(data.sTime);
        });

        return {
            ...toRefs(data),
            channelType,
            channelBg,
        };
    },
});
</script>

<style scoped lang="scss">
.loading-init {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 299;
    background: $color-background-white;
    &-content {
        width: 100%;
        height: 100%;
        @include flexColumnCenter();
        position: relative;
        img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }
        .init-splash {
            width: 50%;
            @include flexCenter();
            .h5mitao {
                width: 200px;
                height: auto;
                object-fit: cover;
            }
        }
        .init-slogo {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            z-index: -1;
            width: 60%;
            bottom: 40%;
        }
        .init-load {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 100px;
            .van-loading {
                font-size: $font-size-28;
            }
        }
    }
}
</style>
