<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="short-video-content">
        <div class="short-video-cover" @click.stop="pauseVideo">
            <div class="video-cover-img">
                <img
                    v-if="isPause"
                    src="@/assets/images/shortVideo/play_icon.png"
                    alt=""
                    class="play-icon"
                />
                <div class="video-ad-btn" v-if="info?.is_ad === 1">
                    <van-button
                        round
                        type="primary"
                        size="small"
                        @click="checkAd(info?.url)"
                        >查看广告详情</van-button
                    >
                </div>
                <div class="no-video-ad" v-else>
                    <div v-show="userInfo.is_vip">
                        <div
                            class="short-video-ad"
                            v-for="item in videoAd"
                            :key="item.id"
                        >
                            <v-image
                                :src="item.img_url"
                                @click="openNewWindow(item)"
                                :class="[
                                    'place' + item.place,
                                    {
                                        'long-up':
                                            (info.join_long_video_id ||
                                                info.join_long_video_img) &&
                                            (item.place == 1 ||
                                                item.place == 2),
                                    },
                                ]"
                                noLazy
                                v-if="userInfo.is_vip !== 1 || item.place == 4"
                            ></v-image>
                        </div>
                    </div>
                    <div
                        v-if="
                            info.join_long_video_id || info.join_long_video_img
                        "
                        class="long-video"
                        @click.stop="toLangPlayer(info.join_long_video_id)"
                    >
                        <div class="long-title">点击进入独享完整版</div>
                        <v-image
                            :src="info.join_long_video_img"
                            noLazy
                        ></v-image>
                    </div>
                </div>
                <div class="video-name">
                    {{ info.video_name }}
                </div>
            </div>
        </div>

        <video
            id="videoPlayer"
            class="video-js short-video"
            x5-video-player-fullscreen
            x5-playsinline
            playsinline
            webkit-playsinline
            x5-video-player-type="h5"
            x5-video-orientation="h5"
            :poster="poster"
        ></video>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    PropType,
    watch,
    onMounted,
    onUnmounted,
    toRefs,
    computed,
} from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // 引入video.js的css
import '@videojs/http-streaming';
import { Decode } from '@/configs/decode';
import { VideoItemType } from '@/types/api/shortVideo';
import { forageStore } from '@/utils/cacheAdapter';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { getShortVideoTime } from '@/api/shortVideo';
import { imgDecode } from '@/configs/imgDecode';
import { Dialog } from 'vant';

export default defineComponent({
    props: {
        info: {
            type: Object as PropType<VideoItemType>,
            default: {} as VideoItemType,
        },
    },

    setup(props, { emit }) {
        const data = reactive({
            player: null as any,
            isPlay: false,
            isPause: false,
            poster: '',
        });
        const store = useStore();
        const router = useRouter();
        const videoAd = computed(() => store.getters.getterShortAd.list);
        const userInfo = computed(() => store.getters.getterUserInfo);

        const InitPlayer = async (playerUrl: string) => {
            videojs.Vhs.xhr.beforeRequest = function (options: any) {
                if (
                    // options.uri.includes('.key') ||
                    // options.uri.includes('.ts') ||
                    options.uri.includes('.m3u8')
                ) {
                    options.uri = Decode(options.uri).md5Path;
                }
                return options;
            };

            // const caheValue: any = await forageStore.getItem(
            //     props.info.video_img,
            // );

            const videoOptions = {
                autoplay: true, // 设置自动播放
                controls: true, // 显示播放的控件
                muted: false,
                language: 'zh-CN', // 设置语言
                playsinline: true, //ios播放自动全屏问题
                // poster: caheValue,  //这样设置不能异步更新。需要在video标签上动态添加poster
                width: '100%',
                height: '100%',
                sources: [
                    {
                        src: Decode(playerUrl).md5Path,
                        type: 'application/x-mpegURL', // 告诉videojs,这是一个hls流
                    },
                ],
                // controlBar: {
                //     fullscreenToggle: false, //全屏按钮隐藏
                //     volumeMenuButton: false, //音量控件隐藏
                // },

                html5: {
                    nativeAudioTracks: false,
                    nativeVideoTracks: false,
                    vhs: {
                        overrideNative: true,
                        withCredentials: false,
                    },
                },
            };
            data.player = videojs(
                document.getElementById('videoPlayer'),
                videoOptions,
                function onPlayerReady() {
                    // 可以播放
                    data.player.on('loadstart', () => {
                        console.log('loadstart');

                        data.isPause = true;
                        data.isPlay = false;
                    });
                    // 开始播放
                    data.player.on('play', () => {
                        console.log('开始播放');
                        checkVideoTime();
                        data.isPlay = true;
                        data.isPause = false;
                    });
                    // 暂停播放
                    data.player.on('pause', () => {
                        console.log('暂停播放');
                        data.isPlay = false;
                        data.isPause = true;
                    });
                    // 结束播放
                    data.player.on('ended', () => {
                        data.isPlay = false;
                        data.isPause = true;
                        console.log('结束播放');
                    });
                    // 倍速切换
                    data.player.on('ratechange', (event: any) => {});
                    // 进度
                    data.player.on('timeupdate', () => {});
                    // 视频源数据加载完成
                    data.player.on('loadedmetadata', function () {});
                    // 清晰度转换时调用的函数
                    data.player.on('resolutionchange', function () {});
                },
            );
        };
        const pauseVideo = () => {
            if (data.isPlay) {
                data.player.pause();
            }
            if (data.isPause) {
                data.player.play();
            }
        };

        const openNewWindow = (val: any) => {
            if (val.place == 3) {
                router.push('/recharge');
            } else {
                router.push(`/iframe?src=${val.link.trim()}`);
            }
        };

        const checkAd = (url: string) => {
            router.push(`/iframe?src=${url.trim()}`);
        };

        //检查观影次数
        const checkVideoTime = () => {
            props.info?.video_id &&
                getShortVideoTime({ video_id: props.info?.video_id }).then(
                    (res: any) => {
                        if (res.code === 200 && res.data.videoNum <= 0) {
                            data.player.pause();
                            Dialog.alert({
                                title: '观看次数不足',
                                theme: 'round-button',
                                confirmButtonText: '开通VIP',
                                confirmButtonColor: '#f99c10',
                                width: '60%',
                                closeOnClickOverlay: true,
                            }).then(() => {
                                router.push('/member');
                            });
                        }
                    },
                );
        };

        //获取封面图
        const getPoster = async () => {
            const protocol = window.location.protocol;
            let newPropsSrc = '';
            if (protocol.includes('https:')) {
                newPropsSrc = props.info.video_img.replace(
                    'http://',
                    'https://',
                ); //地址替换https
            } else {
                newPropsSrc = props.info.video_img.replace(
                    'https://',
                    'http://',
                ); //地址替换http
            }
            const caheValue: any = await forageStore.getItem(newPropsSrc);

            if (caheValue) {
                data.poster = caheValue;
            } else {
                data.poster = await imgDecode(newPropsSrc);
            }
        };

        //去长视频页面

        const toLangPlayer = (id: number) => {
            router.push(`/player?movieId=${id}`);
        };
        onMounted(async () => {
            data.player?.dispose();
            data.player = null;

            await getPoster();
            await InitPlayer(props.info.video_path);
        });
        onUnmounted(() => {
            data.player?.dispose();
            data.player = null;
        });

        return {
            pauseVideo,
            ...toRefs(data),
            videoAd,
            openNewWindow,
            userInfo,
            checkAd,
            toLangPlayer,
        };
    },
});
</script>

<style lang="scss" scoped>
.short-video-content {
    width: 100%;
    height: 100%;
    position: relative;
    .short-video-cover {
        position: absolute;
        z-index: 9;
        left: 0;
        top: 0;
        right: 0;
        bottom: 70px;
        @include flexCenter();
        .video-cover-img {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            .video-name {
                position: absolute;
                left: 20px;
                bottom: 20px;
                z-index: 9;
                color: $color-text-white;
                font-size: $font-size-30;
                width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .video-poster {
                position: absolute;
                z-index: 1;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                display: none;
            }
            .video-ad-btn {
                position: absolute;
                left: 20px;
                bottom: 100px;
                z-index: 9;
            }
            .play-icon {
                width: 100px;
                height: auto;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 9;
            }
            .place1 {
                width: 500px;
                height: auto;
                position: absolute;
                left: 20px;
                bottom: 220px;
                z-index: 9;
            }
            .place2 {
                width: 500px;
                height: auto;
                position: absolute;
                left: 20px;
                bottom: 120px;
                z-index: 9;
            }
            .place3 {
                width: 140px;
                height: auto;
                position: absolute;
                left: 20px;
                top: 45px;
                z-index: 9;
            }
            .place4 {
                width: 140px;
                height: auto;
                position: absolute;
                right: 20px;
                top: 260px;
                z-index: 9;
            }
            .long-up {
                margin-bottom: 100px;
            }
            .long-video {
                width: 350px;
                height: 200px;
                position: absolute;
                z-index: 11;
                right: 0px;
                bottom: 0px;
                @include flexColumnBetween();
                background-color: $color-background-masking;
                color: $color-text-white;
                border-radius: 20px;
                .long-title {
                    width: 100%;
                    height: 40px;
                    @include flexCenter();
                }
                img {
                    width: 100%;
                    height: 160px;
                    object-fit: cover;
                    border-radius: 0 0 20px 20px;
                }
            }
        }
    }
    #videoPlayer {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
}
</style>
<style lang="scss">
.short-video {
    @include bgurl('@/assets/images/shortVideo/video_bg.png');
    video {
        object-fit: fill;
    }
    .vjs-poster {
        height: 100%;
        width: 100%;
        position: initial;
    }
    .vjs-live-control {
        display: none;
    }

    .vjs-big-play-button {
        font-size: $font-size-40;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: none;
    }
    .vjs-control-bar {
        height: 70px;
        background: none;
    }
    .vjs-picture-in-picture-control,
    .vjs-volume-panel,
    .vjs-fullscreen-control {
        display: none;
    }

    .vjs-load-progress {
        div {
            background-color: #f99c10;
        }
    }
    .vjs-play-control {
        width: 80px;
        font-size: $font-size-26;
        display: none;
    }
    .vjs-progress-control {
        margin-left: 15px;
        .vjs-progress-holder {
            height: 6px;
        }
        .vjs-play-progress:before {
            font-size: $font-size-26;
        }
    }
    .vjs-remaining-time {
        font-size: $font-size-26;
    }
}
</style>
