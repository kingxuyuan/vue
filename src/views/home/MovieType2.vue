<template>
    <div
        class="movie-type2"
        v-no-result:[noResultText]="noResult"
        v-loading:[loadingText]="loading"
    >
        <van-pull-refresh v-model="refreshing" @refresh="onRefreshfn">
            <div class="movie-type2-main">
                <div
                    class="movie-type2-main-item"
                    v-for="item in currDataInfo"
                    :key="item.id"
                >
                    <h1 v-if="!SHOWTITLE.includes(item.type)">
                        {{ item.title }}
                    </h1>
                    <!-- 轮播图 -->
                    <div
                        class="banner"
                        :class="{ 'moto-banner': item.type === 2 }"
                        v-if="[1, 2].includes(item.type)"
                    >
                        <van-swipe
                            class="my-swipe"
                            :autoplay="3000"
                            indicator-color="white"
                        >
                            <van-swipe-item
                                v-for="bItem in item.data"
                                :key="bItem.id"
                                @click="openNewWindow(bItem.url)"
                            >
                                <v-image :src="bItem?.pic" />
                            </van-swipe-item>
                        </van-swipe>
                        <div class="advertise" v-if="item.type === 2">广告</div>
                    </div>
                    <!-- 游戏 -->
                    <div class="game" v-if="item.type === 7">
                        <div
                            class="game-item"
                            v-for="gItem in item.data1"
                            :key="gItem.id"
                            @click="openNewWindow(gItem?.url)"
                        >
                            <v-image :src="gItem?.pic" />
                        </div>
                    </div>
                    <!-- 走马灯 -->
                    <div class="notice" v-if="item.type === 8">
                        <van-notice-bar
                            left-icon="volume-o"
                            background="#fff"
                            color="#333"
                            speed="30"
                            scrollable
                        >
                            <span
                                class="notice-message"
                                v-for="nItem in item.data"
                                :key="nItem.id"
                                @click="openNewWindow(nItem.url)"
                                >{{ nItem.msg }}</span
                            >
                        </van-notice-bar>
                    </div>
                    <!-- 首页推荐、明星出品 -->
                    <div
                        class="meisei-exhibition"
                        :class="{ recommend: item.type === 4 }"
                        v-if="[3, 4].includes(item.type)"
                    >
                        <div
                            class="meisei-exhibition-item content"
                            v-for="(mItem, mIdx) in item.data"
                            :class="{ padd: mIdx > 0 && item.type !== 4 }"
                            :key="mItem.id"
                        >
                            <MovieItem :item="mItem" />
                        </div>
                    </div>
                    <!-- 三级&伦理、麻豆精选 -->
                    <div class="level3-ethics" v-if="item.type === 5">
                        <div
                            class="level3-ethics-item content"
                            v-for="lItem in item.data"
                            :key="lItem.id"
                        >
                            <MovieItem :item="lItem" />
                        </div>
                    </div>

                    <div
                        class="more-btn"
                        v-if="!SHOWTITLE.includes(item.type)"
                        @click="goToMoremovie(item.id, item.title)"
                    >
                        <i></i>
                        更多影片
                    </div>
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    computed,
    reactive,
    toRefs,
    onActivated,
    watch,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store';
import { returnMovieType } from '@/utils/tools';
import Cache from '@/utils/localStorage';
import { pageInfo } from '@/api/home';
import { configActionTypes } from '@/store/modules/config/action-types';
import MovieItem from '@/components/refresh/MovieItem.vue';
import _ from 'lodash';

// type值：显示标题
const SHOWTITLE = [1, 2, 6, 7, 8];

export default defineComponent({
    components: {
        MovieItem,
    },
    props: {
        id: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const fromPath = computed(() => store.getters.getterPath);

        let data = reactive({
            allDataInfo: [] as any[],
            currDataInfo: [],
            loading: false,
            noResult: false,
            refreshing: false,
            noResultText: '暂无数据',
            loadingText: '加载中...',
        });

        const getMovies2 = async (id: number) => {
            data.loading = true;
            data.noResult = false;
            const result: any = await pageInfo({ id });
            if (result.code === 0 && result?.data?.list?.length > 0) {
                data.loading = false;
                data.noResult = false;
                data.refreshing = false;
                let isInclude = data.allDataInfo.some(
                    (item) => item.category_id === props.id,
                );
                if (!isInclude) {
                    data.allDataInfo = [
                        ...data.allDataInfo,
                        { category_id: props.id, ...result.data },
                    ];
                } else {
                    let currMovies = _.cloneDeep(data.allDataInfo).map(
                        (item: any) => {
                            if (item.category_id === props.id) {
                                item.list = [...item.list, ...result.data.list];
                                item.category_id = props.id;
                            }
                            return { ...item };
                        },
                    );
                    data.allDataInfo = [...currMovies];
                }

                data.currDataInfo = data.allDataInfo.find(
                    (item) => item.category_id === props.id,
                ).list;
            } else {
                data.loading = false;
                if (data.currDataInfo.length === 0) {
                    data.noResult = true;
                }
            }
        };

        const goToPlayer = (id: number) => {
            router.push({
                path: '/player',
                query: {
                    id,
                },
            });
        };

        const openNewWindow = (url: string) => {
            router.push(`/iframe?src=${url.trim()}`);
        };

        const onRefreshfn = async () => {
            data.currDataInfo = [];
            data.allDataInfo = [];
            data.loading = false;
            data.noResult = false;
            getMovies2(props.id);
        };

        const goToMoremovie = (id: number, title: string) => {
            Cache.localSet('movieTitle', title);
            router.push({
                path: '/movies',
                query: {
                    id,
                },
            });
        };

        //更新购买状态的数据
        onActivated(() => {
            if (fromPath.value.from.includes('/player')) {
                onRefreshfn();
                store.dispatch(configActionTypes.GET_PATH, {
                    to: fromPath.value.to,
                    from: '/',
                });
            }
        });

        onMounted(() => {
            getMovies2(props.id);
        });

        return {
            SHOWTITLE,
            goToPlayer,
            openNewWindow,
            returnMovieType,
            ...toRefs(data),
            goToMoremovie,
            onRefreshfn,
        };
    },
});
</script>

<style lang="scss" scoped>
.movie-type2 {
    height: 100%;

    .van-empty {
        margin-top: 160px;
    }
    .van-loading {
        margin-top: 360px;
    }
    .no-network {
        .retry {
            width: 180px;
            height: 54px;
            line-height: 54px;
            text-align: center;
            margin: auto;
            font-size: $font-size-24;
            color: $color-text-gray;
            border: 1px solid $color-text-gray;
            border-radius: 100px;
        }
    }
    .movie-type2-main-item {
        padding: 0 10px;
        box-sizing: border-box;
        &:not(:first-child) {
            margin-top: 30px;
        }
        h1 {
            font-size: $font-size-32;
            margin-bottom: 20px;
        }
        img {
            border-radius: 10px;
        }
        .content {
            width: 50%;
            position: relative;
            box-sizing: border-box;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .banner {
        width: 100%;
        margin-top: 10px;
        padding: 0 10px;
        box-sizing: border-box;
        img {
            width: 100%;
            height: 360px;
            display: block;
            object-fit: cover;
            border-radius: 10px;
        }
    }
    .moto-banner {
        position: relative;
        img {
            height: 200px;
        }
        .advertise {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: $font-size-20;
            padding: 5px 12px;
            color: $color-text-959595;
            background: linear-gradient(
                to right,
                $color-text-gray,
                $color-text-white
            );
        }
    }

    .game {
        @include flexBetweenCenterWrap();
        &-item {
            width: 33.33%;
            height: 150px;
            padding-left: 5px;
            padding-right: 5px;
            padding-bottom: 10px;
            box-sizing: border-box;
            img {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: contain;
            }
        }
    }

    .notice {
        margin-top: -40px;
        &-message {
            font-size: $font-size-24;
            padding-left: 500px;
        }
        .van-notice-bar {
            padding: 0 10px;
        }
    }

    .meisei-exhibition {
        @include flexBetweenCenterWrap();
        &-item {
            margin-bottom: 15px;
            &:first-child {
                width: 100%;
                .movies-item-box {
                    height: 400px;
                }
            }
        }
        .padd {
            &:nth-child(odd) {
                padding-left: 8px;
            }
            &:nth-child(even) {
                padding-right: 8px;
            }
        }
    }
    .recommend {
        .meisei-exhibition-item,
        .meisei-exhibition-item:first-child {
            width: 50%;
        }
        .meisei-exhibition-item {
            margin-bottom: 15px;
            &:nth-child(odd) {
                padding-right: 8px;
            }
            &:nth-child(even) {
                padding-left: 8px;
            }
        }
    }
    .level3-ethics {
        @include flexBetweenCenterWrap();
        .content {
            width: 32.5%;
            margin-bottom: 30px;
        }
    }
    .more-btn {
        width: 500px;
        height: 80px;
        margin: 10px auto 60px;
        border-radius: 20px;
        @include flexCenter();
        font-size: $font-size-26;
        background-color: $color-background-d7d7d787;
        i {
            width: 30px;
            height: 30px;
            display: block;
            margin-right: 20px;
            border: 1px solid $color-background-details2;
            border-radius: 50%;
            background-size: contain;
            background-repeat: no-repeat;
            background-position-x: -8px;
            background-position-y: 6px;
            background-image: url('../../assets/images/home/play-icon.webp');
        }
    }
}
</style>
<style lang="scss">
.movie-type2 {
    .van-loading {
        .van-loading__text {
            margin-top: 16px;
            padding-left: 20px;
        }
    }
    .no-network p {
        margin-top: -5px;
    }
    .movies-item {
        width: 100% !important;
    }
    .meisei-exhibition {
        &-item {
            &:first-child {
                .movies-item-box {
                    height: 400px;
                }
            }
        }
    }
    .recommend {
        .meisei-exhibition-item,
        .meisei-exhibition-item:first-child {
            .movies-item-box {
                height: 240px;
            }
        }
    }
    .level3-ethics {
        .movies-item-box {
            height: 300px;
            .movie-btn {
                right: 10px;
            }
            .movie-price {
                top: 10px;
            }
            .movie-duration {
                bottom: 10px;
            }
        }
    }
}
.myloading {
    padding-left: 44px;
    padding-right: 44px;
    .van-toast__text {
        white-space: nowrap;
    }
}
.banner .van-swipe__indicator--active {
    padding: 0 8px;
    border-radius: 6px;
}
</style>
