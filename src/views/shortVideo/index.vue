<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="short-video">
        <van-swipe
            class="video-swipe"
            vertical
            :loop="false"
            :show-indicators="false"
            @change="onChange"
        >
            <div
                class="video-swipe-box"
                v-for="(item, index) in videoData"
                :key="item.video_id"
            >
                <van-swipe-item
                    class="video-swipe-item"
                    v-if="currentIndex === index"
                >
                    <van-pull-refresh
                        v-model="loading"
                        @refresh="onRefresh"
                        success-text="刷新成功"
                        v-if="currentIndex == 0"
                        class="paly-norefresh"
                    >
                        <Player :info="item"></Player>
                    </van-pull-refresh>
                    <div v-else class="paly-norefresh">
                        <Player :info="item"></Player>
                    </div>
                </van-swipe-item>

                <van-swipe-item class="video-swipe-item" v-else>
                    <v-image :src="item.video_img"></v-image>
                </van-swipe-item>
            </div>
        </van-swipe>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    computed,
    toRefs,
    watch,
    onDeactivated,
    onActivated,
} from 'vue';
import { useStore } from '@/store';
import { shortVideoActionTypes } from '@/store/modules/shortVideo/action-types';
import { shortVideoMutationTypes } from '@/store/modules/shortVideo/mutation-types';
import { userActionTypes } from '@/store/modules/user/action-types';
import Player from './videojs.vue';
import { Toast } from 'vant';
Toast.allowMultiple();

export default defineComponent({
    components: {
        Player,
    },
    setup() {
        const store = useStore();
        const loading = ref(false);
        const onRefresh = () => {
            store.commit(shortVideoMutationTypes.SET_DELSHORTVIDEO);
            loading.value = true;
            data.page = 1;
            getShortVideos();
        };
        const videoData = computed(() => store.getters.getterShortVideo.video);

        const data = reactive({
            page: 1,
            size: 20,
            currentIndex: 0,
            time: null as any,
            toast: null as any,
        });

        const onChange = (index: number) => {
            data.currentIndex = index;
        };

        const getShortAd = () => {
            store.dispatch(shortVideoActionTypes.GET_SHORTVIDEOAD);
        };

        const getShortVideos = () => {
            store.dispatch(shortVideoActionTypes.GET_SHORTVIDEO, {
                page: data.page,
                size: data.size,
            });
        };
        const getUserInfo = () => {
            store.dispatch(userActionTypes.GET_USREINFO);
        };

        const loadingToast = () => {
            data.toast = Toast.loading({
                message: '加载中...',
                forbidClick: false,
                duration: 0,
            });
        };
        onDeactivated(() => {
            data.toast.clear();
        });
        onMounted(() => {
            loadingToast();
            getShortVideos();
            getShortAd();
        });

        //实时获取用户状态，避免缓存
        onActivated(() => {
            getUserInfo();
        });

        watch(
            () => [videoData.value, data.currentIndex],
            (val: any) => {
                if (val[0]?.length > 0) {
                    loading.value = false;
                    data.toast.clear();
                }
                if (val[1] >= val[0]?.length - 5) {
                    data.page += 1;
                    getShortVideos();
                }
            },
        );

        return {
            loading,
            onRefresh,
            videoData,
            onChange,
            ...toRefs(data),
        };
    },
});
</script>

<style scoped lang="scss">
.short-video {
    background: $color-background-white;
    @include bgurl('@/assets/images/shortVideo/video_bg.png');
    .video-swipe {
        width: 100%;
        height: 100%;
        &-box {
            width: 100%;
            height: 100%;
            .video-swipe-item {
                background: $color-background-blank;
                @include bgurl('@/assets/images/shortVideo/video_bg.png');
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .paly-norefresh {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>
