<template>
    <div class="player">
        <div class="player-box" ref="playerbox">
            <div class="back" @click="backPrevPage">
                <van-icon
                    class="back-icon"
                    name="arrow-left"
                    color="rgba(255,255,255,.7)"
                    size="20"
                />
            </div>
            <!-- <video id="videoPlayer" class="video-js"></video> -->
            <!-- 5秒广告 -->
            <div
                class="posbox advertise"
                v-if="
                    playerInfo?.type === 1 &&
                    userInfoState.is_vip !== 1 &&
                    countdown > 0
                "
                @click="advertiseJump(playerInfo?.top_adv?.url)"
            >
                <v-image :src="playerInfo?.top_adv?.pic" />
                <div class="advertise-countdown">
                    {{ countdown }}<span>s</span>
                </div>
                <div class="advertise-details">查看详情</div>
            </div>

            <!-- 需要购买 不VIP 提示  -->
            <div
                class="posbox need-buy"
                v-if="
                    (playerInfo?.type === 2 && playerInfo.is_buy === 0) ||
                    (playerInfo?.type === 3 && userInfoState.is_vip !== 1)
                "
            >
                <v-image :src="playerInfo?.cover" />
                <div class="posbox need-buy-main">
                    <p class="tips1" v-show="returnTipsFn(playerInfo?.type)">
                        {{ returnTipsFn(playerInfo?.type) }}
                    </p>
                    <p class="tips2">一次购买，永久收藏</p>
                    <div
                        class="buy-btn"
                        @click="buyMovieFn(playerInfo?.type, playerInfo?.id)"
                    >
                        <span v-if="playerInfo?.type === 2"
                            >￥{{ playerInfo?.price }}</span
                        >
                        <span v-if="playerInfo?.type === 2">立即购买</span>
                        <span v-if="playerInfo?.type === 3">立即开通</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="player-info">
            <h1>{{ playerInfo?.title }}</h1>
            <div class="player-info-desc">
                <span>{{ playerInfo?.click_num_str }}</span>
                <span v-if="playerInfo?.number"
                    >番号:{{ playerInfo?.number }}</span
                >
                <span v-if="playerInfo?.create_time"
                    >{{ playerInfo?.create_time }}发布</span
                >
            </div>
        </div>
        <div class="player-main">
            <div class="player-main-wrap">
                <div class="ad">
                    <v-image
                        v-if="playerInfo?.middle_adv?.pic"
                        :src="playerInfo?.middle_adv?.pic"
                        @click="advertiseJump(playerInfo?.middle_adv?.url)"
                    />
                </div>

                <Recommend />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    reactive,
    ref,
    toRefs,
    watch,
    onMounted,
    onDeactivated,
    onActivated,
} from 'vue';
import { Toast, Dialog } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // 引入video.js的css
import { useStore } from '@/store';
import { Decode } from '@/configs/decode';
import { playerActionTypes } from '@/store/modules/player/action-types';
import { userActionTypes } from '@/store/modules/user/action-types';
import { playerMutationTypes } from '@/store/modules/player/mutation-types';
import { DataType } from '@/types/component/player';
import { ResponsePlayerType } from '@/types/api/player';
import { addPlay, buyMovie, playEnd } from '@/api/player';
import '@videojs/http-streaming';
import _ from 'lodash';

import Recommend from './Recommend.vue';
Toast.allowMultiple();
const TIPS_TEXT: any = {
    2: '本片为独家合作视频，需付费观看',
    3: '本片为VIP视频，需开通VIP才可观看',
};

let playEndParams = {
    startTime: 0,
    endTime: 0,
    movieId: 0,
};

// 检查播放结束
const checkPlayEnd = () => {
    playEndParams.startTime !== 0 &&
        playEnd({
            id: playEndParams.movieId,
            start_time: playEndParams.startTime,
            end_time: new Date().getTime(),
        });
};

export default defineComponent({
    components: {
        Recommend,
    },

    beforeRouteLeave(to, from, next) {
        checkPlayEnd();
        playEndParams = {
            startTime: 0,
            endTime: 0,
            movieId: 0,
        };
        next();
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const playerbox = ref(null) as any;
        const playerInfo = computed(() => store.getters.getterPlayer.data);
        const userInfoState = computed(() => store.getters.getterUserInfo);
        const fromPath = computed(() => store.getters.getterPath);

        let data: DataType = reactive({
            player: null,
            countdown: 5,
            loadingToast: null,
            timer: null,
        });

        // 创建dom元素
        const creatDom = () => {
            let dom = document.createElement('video');
            dom.id = 'videoPlayer';
            dom.className = 'video-js video-player';
            dom.setAttribute('x5-video-player-fullscreen', 'true');
            dom.setAttribute('x5-playsinline', 'true');
            dom.setAttribute('playsinline', 'true');
            dom.setAttribute('webkit-playsinline', 'true');
            dom.setAttribute('x5-video-player-type', 'h5');
            dom.setAttribute('x5-video-orientation', 'h5');
            playerbox.value.appendChild(dom);
        };

        // 实例化播放器
        const InitPlayer = (url: string) => {
            //全局拦截
            // videojs.Vhs.xhr.beforeRequest = function (options: any) {
            //     if (
            //         options.uri.includes('.key') ||
            //         options.uri.includes('.ts') ||
            //         options.uri.includes('.m3u8')
            //     ) {
            //         options.uri = Decode(options.uri).md5Path;
            //     }
            //     return options;
            // };
            // 创建dom元素

            creatDom();
            let playerUrl = Decode(url).md5Path;

            const videoOptions = {
                autoplay: true, // 设置自动播放
                controls: true, // 显示播放的控件
                muted: false,
                language: 'zh-CN', // 设置语言
                playsinline: true, //ios播放自动全屏问题
                sources: [
                    {
                        src: playerUrl,
                        type: 'application/x-mpegURL', // 告诉videojs,这是一个hls流
                    },
                ],
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
                    // 开始播放
                    data.player.on('play', () => {
                        console.log('开始播放');
                        checkVideoTime();
                        playEndParams.startTime = new Date().getTime();
                        playEndParams.movieId = Number(route.query.movieId);
                    });
                    // 暂停播放
                    data.player.on('pause', () => {
                        console.log('暂停播放');
                        checkPlayEnd();
                    });
                    // 结束播放
                    data.player.on('ended', () => {
                        console.log('结束播放');
                        checkPlayEnd();
                    });
                    // 倍速切换
                    data.player.on('ratechange', (event: any) => {});
                    // 进度
                    data.player.on('timeupdate', (event: any) => {});
                    // 视频源数据加载完成
                    data.player.on('loadedmetadata', function () {});
                    // 清晰度转换时调用的函数
                    data.player.on('resolutionchange', function () {});
                },
            );
            //全局拦截播放设置
            // data.player.ready(function () {
            //     data.player.src({
            //         src: playerUrl,
            //         type: 'application/x-mpegURL',
            //     });
            // });
            data.player.on('loadstart', function (e: any) {
                const tech = data.player.tech(false);

                tech.vhs.xhr.beforeRequest = function (options: any) {
                    if (
                        // options.uri.includes('.key') ||
                        // options.uri.includes('.ts') ||
                        options.uri.includes('.m3u8')
                    ) {
                        options.uri = Decode(options.uri).md5Path;
                    }
                    return options;
                };
            });
        };

        const backPrevPage = () => {
            fromPath.value.from.includes('/player')
                ? router.push('/')
                : router.back();
        };

        // 广告跳转
        const advertiseJump = (url: string) => {
            router.push(`/iframe?src=${url.trim()}`);
        };

        // 获取详情数据
        const getPlayerInfo = () => {
            const id = route.query.movieId as string;
            store.dispatch(playerActionTypes.GET_PLAYER, { id });
        };
        // 5秒倒计时
        const countdownFn = () => {
            data.timer = setInterval(() => {
                data.countdown -= 1;
                if (data.countdown <= 0) {
                    queryViews();
                    clearInterval(data.timer);
                }
            }, 1000);
        };

        // 播放
        const queryViews = () => {
            data.player?.dispose();
            data.player = null;
            InitPlayer(
                playerInfo.value.definition.up ||
                    playerInfo.value.definition.mid ||
                    playerInfo.value.definition.low,
            );
        };

        // 查看观影次数
        const checkVideoTime = () => {
            addPlay({ movie_id: Number(route.query.movieId) }).then(
                (res: any) => {
                    if (res.code === 0 && res.data.re_today_view_times <= 0) {
                        data.player.puase();
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

        // 购买电影
        const buyMovieFn = (type: number, id: number) => {
            if (type === 3) {
                router.push('/member');
                return;
            }
            showLoadingToast();

            buyMovie({
                movie_id: id,
            }).then((res: any) => {
                const { code, msg } = res;
                if (code === 0) {
                    data.loadingToast?.clear();
                    if (res.data?.movie_code === 1) {
                        Dialog.alert({
                            width: '260px',
                            title: '购买失败，余额不足',
                            theme: 'round-button',
                            className: 'buyLoading',
                            confirmButtonText: '立即充值',
                            confirmButtonColor: '#fff',
                            closeOnClickOverlay: true,
                        }).then(() => {
                            router.push('/recharge');
                        });
                    } else {
                        msg && Toast.success(msg);
                        if (res.data?.movie_code === 3) {
                            store.commit(playerMutationTypes.TOGGLE_PLAYER, {
                                data: {
                                    ...store.state.player.player.data,
                                    is_buy: 1,
                                } as ResponsePlayerType,
                            });
                        }
                    }
                }
            });
        };

        const showLoadingToast = () => {
            data.loadingToast = Toast.loading({
                message: '加载中...',
                forbidClick: false,
                duration: 0,
            });
        };

        const returnTipsFn = (type: number) => {
            return TIPS_TEXT[type];
        };

        //获取用户信息
        const getUserInfo = () => {
            store.dispatch(userActionTypes.GET_USREINFO);
        };

        watch(
            () => route.query.movieId,
            (id, oldId) => {
                if (id !== oldId && id) {
                    store.commit(playerMutationTypes.TOGGLE_PLAYER, {
                        data: {} as ResponsePlayerType,
                    });
                    data.player?.dispose();
                    data.player = null;
                    data.loadingToast?.clear();
                    clearInterval(data.timer);
                    data.countdown = 5;
                    getPlayerInfo();
                }
            },
        );

        watch(
            () => [
                playerInfo.value.type,
                playerInfo.value.is_buy,
                userInfoState.value.is_vip,
            ],
            (args, prveArgs) => {
                if (!_.isEqual(args, prveArgs)) {
                    // type    1: 免费    2：收费   3：VIP
                    // is_buy  0: 未购买  1：已购买
                    // 免费或者vip类型是vip播放,收费已购买播放
                    if (
                        ((args?.[0] === 1 || args?.[0] === 3) &&
                            args?.[2] === 1) ||
                        (args?.[0] === 2 && args?.[1] === 1)
                    ) {
                        queryViews();
                    } else if (args?.[0] === 1 && args[2] && args[2] !== 1) {
                        countdownFn();
                    }
                }
            },
        );

        onMounted(() => {
            getPlayerInfo();
        });

        //实时获取用户状态，避免缓存
        onActivated(() => {
            getUserInfo();
        });
        onDeactivated(() => {
            data.player?.dispose();
            data.player = null;
            data.timer && clearInterval(data.timer);
            store.commit(playerMutationTypes.TOGGLE_PLAYER, {
                data: {} as ResponsePlayerType,
            });
        });

        return {
            playerbox,
            playerInfo,
            ...toRefs(data),
            backPrevPage,
            advertiseJump,
            buyMovieFn,
            returnTipsFn,
            showLoadingToast,
            userInfoState,
        };
    },
});
</script>

<style lang="scss" scoped>
.player {
    @include flexColumnStart();
    &-box {
        width: 100%;
        height: 450px;
        position: relative;
        box-shadow: 0px 0px 5px 0px $box-shadow-gray;
        background: $color-background-blank;
        .back {
            position: absolute;
            top: 20px;
            left: 15px;
            z-index: 19;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            padding-right: 5px;
            box-sizing: border-box;
            @include flexCenter();
            background-color: $color-background-masking;
        }
        .posbox {
            width: 100%;
            height: 100%;
            top: 0;
            right: 0;
            position: absolute;
        }
        .advertise {
            z-index: 9;
            img {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: cover;
            }
            &-countdown {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: $font-size-24;
                width: 90px;
                height: 45px;
                line-height: 45px;
                text-align: center;
                border-radius: 50px;
                color: $color-text-white;
                background-color: $color-background-masking;
                span {
                    font-size: $font-size-30;
                }
            }
            &-details {
                position: absolute;
                right: 15px;
                bottom: 15px;
                width: 160px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                border-radius: 60px;
                font-size: $font-size-26;
                color: $color-text-white;
                background: linear-gradient(
                    to bottom,
                    $color-background-details1,
                    $color-background-details2
                );
            }
        }
        .need-buy {
            z-index: 9;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            &-main {
                text-align: center;
                background: $color-background-0-5;
                .tips1 {
                    margin-top: 180px;
                    font-size: $font-size-28;
                    color: $color-text-white;
                }
                .tips2 {
                    margin: 14px 0 70px;
                    font-size: $font-size-24;
                    color: $color-text-white-8;
                }
                .buy-btn {
                    width: fit-content;
                    margin: auto;
                    padding: 16px 20px;
                    border-radius: 100px;
                    font-size: $font-size-24;
                    color: $color-text-price;
                    background: linear-gradient(
                        to right,
                        $color-background-price-btn1,
                        $color-background-price-btn2
                    );
                    span {
                        margin-right: 6px;
                    }
                }
            }
        }
    }
    &-main {
        flex: 1;
        width: 100%;
        overflow: hidden;
        &-wrap {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
        }
    }
    &-info {
        width: 100%;
        padding: 16px;
        box-sizing: border-box;
        h1 {
            margin: 10px 0 20px;
            font-size: $font-size-32;
            font-weight: 600;
            color: $color-text-333;
        }
        &-desc {
            span {
                font-size: $font-size-24;
                color: $color-text-gray-d;
                &:not(:first-child) {
                    margin-left: 20px;
                }
            }
        }
    }
    .ad {
        & > img {
            width: 100%;
            margin: 16px 0;
            max-height: 175px;
            object-fit: cover;
        }
    }
}
</style>

<style lang="scss">
.video-player {
    width: 100%;
    height: 100%;
    video {
        object-fit: cover;
    }

    .vjs-big-play-button {
        font-size: $font-size-40;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .vjs-control-bar {
        height: 70px;
    }
    .vjs-play-control {
        width: 80px;
        font-size: $font-size-26;
    }
    .vjs-volume-panel {
        width: 50px;
        font-size: 22px;
        .vjs-mute-control {
            width: 100%;
        }
    }
    .vjs-remaining-time {
        font-size: $font-size-26;
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
    .vjs-picture-in-picture-control {
        width: 40px;
        font-size: $font-size-26;
    }
    .vjs-remaining-time,
    .vjs-button > .vjs-icon-placeholder:before {
        @include flexCenter();
    }
    .vjs-fullscreen-control {
        width: 90px;
        padding-right: 30px;
    }
    .vjs-button > .vjs-icon-placeholder:before {
        font-size: $font-size-40;
    }
}
.buyLoading {
    button {
        background: $color-background-theme !important;
    }
}
.video-js,
.video-js .vjs-tech {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
