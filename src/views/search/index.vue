<template>
    <div class="search">
        <van-nav-bar title="高清" @click-left="onClickLeft">
            <template #left>
                <van-icon name="arrow-left" size="24" color="#333" />
            </template>
        </van-nav-bar>

        <div class="search-main" :class="{ fixed: isFocus }">
            <div class="search-main-top">
                <div class="search-main-input">
                    <van-icon
                        class="search-icon"
                        name="search"
                        size="22"
                        color="#6d6d6e"
                    />
                    <input
                        type="text"
                        v-model="keyWords"
                        placeholder="输入艺人/片名"
                        @focus="searchFocus"
                    />
                </div>
                <div class="cancel" v-show="isFocus" @click="cancelSearch">
                    取消
                </div>
            </div>
            <!-- 搜索没值时显示 -->
            <template v-if="searchData.movies.length <= 0">
                <div class="search-swipe">
                    <van-swipe
                        class="search-swipe-wrap"
                        :autoplay="5000"
                        indicator-color="white"
                    >
                        <van-swipe-item
                            v-for="sItem in activeData.s_top"
                            :key="sItem.id"
                            @click="openNewWindow(sItem.url)"
                        >
                            <v-image :src="sItem?.pic" />
                        </van-swipe-item>
                    </van-swipe>
                </div>

                <div class="search-main-item hot">
                    <div class="title">热门搜索</div>
                    <div class="hot-list">
                        <div
                            class="hot-list-item"
                            v-for="(hItem, idx) in searchHot.list"
                            :key="idx"
                            @click="searchHotFn(hItem.title)"
                        >
                            {{ hItem.title }}
                        </div>
                    </div>
                </div>
            </template>

            <div class="search-main-movie" v-else>
                <div class="search-main-movie-title">
                    关键词:
                    <span>{{ keyWords }}</span>
                    ，搜到<span> {{ searchData.movie_count }} </span>部电影
                </div>

                <div
                    class="search-main-movie-box"
                    v-loading:[loadingText]="loading"
                >
                    <div class="search-main-movie-list">
                        <div class="search-main-movie-wrap">
                            <Refresh
                                :movies="searchData?.movies"
                                :loading="loading"
                                :finished="noResult"
                                @onload="onload"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="search-swipe search-under">
                <van-swipe
                    class="search-swipe-wrap"
                    :autoplay="5000"
                    indicator-color="white"
                >
                    <van-swipe-item
                        v-for="sItem in activeData.s_under"
                        :key="sItem.id"
                        @click="openNewWindow(sItem.url)"
                    >
                        <v-image :src="sItem?.pic" />
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import _ from 'lodash';
import {
    defineComponent,
    reactive,
    toRefs,
    onMounted,
    computed,
    watch,
} from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { useStore } from '@/store';
import { DataTypes } from '@/types/component/search';
import { searchActionTypes } from '@/store/modules/search/action-types';
import Refresh from '@/components/refresh/Refresh.vue';

Toast.allowMultiple();
export default defineComponent({
    components: {
        Refresh,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const activeData = computed(() => store.getters.getterActiveData);
        const searchHot = computed(() => store.getters.getterSearchHot);
        const noResult = computed(
            () => store.state.search.searchKeyWords.noResult,
        );
        const loading = computed(
            () => store.state.search.searchKeyWords.loading,
        );
        const searchData = computed(
            () => store.state.search.searchKeyWords.data,
        );

        const data = reactive({
            page: 1,
            isFocus: false,
            keyWords: '',
            loadingToast: null,
            noResultText: '暂无数据',
            loadingText: '加载中...',
        }) as DataTypes;

        const onClickLeft = () => {
            router.push('/home');
        };
        const searchFocus = () => {
            data.isFocus = true;
        };
        const cancelSearch = () => {
            data.isFocus = false;
            data.page = 1;
            data.keyWords = '';
            store.dispatch(searchActionTypes.CLEARN_SEARCH_KEY_ACTION);
        };
        const searchHotFn = (title: string) => {
            data.keyWords = title;
        };

        const getSearchData = () => {
            store.dispatch(searchActionTypes.SEARCH_KEY_WORDS_ACTION, {
                page: data.page,
                keywords: data.keyWords,
            });
        };

        // 下拉刷新
        const onload = () => {
            getSearchData();
        };

        const openNewWindow = (url: string) => {
            router.push(`/iframe?src=${url.trim()}`);
        };

        const debounced = _.debounce((k: any) => {
            k && getSearchData();
        }, 300);

        watch(
            () => data.keyWords,
            (k) => {
                store.dispatch(searchActionTypes.CLEARN_SEARCH_KEY_ACTION);
                data.page = 1;
                data.isFocus = true;
                debounced(k);
            },
        );

        watch(
            () => searchData.value?.movies,
            (val, prevVal) => {
                if (val.length > prevVal.length) {
                    data.page++;
                    data.loadingToast?.clear();
                }
            },
        );

        onMounted(() => {
            store.dispatch(searchActionTypes.SEARCH_HOT_ACTION);
        });

        return {
            noResult,
            loading,
            searchHot,
            searchData,
            activeData,
            ...toRefs(data),
            onClickLeft,
            searchHotFn,
            searchFocus,
            cancelSearch,
            onload,
            openNewWindow,
        };
    },
});
</script>

<style lang="scss" scoped>
.search {
    .fixed {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        height: 100%;
    }
    .search-main {
        width: 100%;
        &-top {
            width: 100%;
            height: 90px;
            padding: 0 16px;
            box-sizing: border-box;
            @include flexStartCenter();
            .cancel {
                padding: 0 30px;
                font-size: $font-size-28;
                color: $color-text-959595;
            }
        }
        .search-main-input {
            flex: 1;
            height: 60px;
            border-radius: 10px;
            @include flexStartCenter();
            background-color: $color-background-buy2;
            .search-icon {
                margin-left: 20px;
                margin-right: 25px;
            }
            input {
                flex: 1;
                height: 100%;
                border: none;
                outline: none;
                font-size: $font-size-28;
                color: $color-text-959595;
                background-color: transparent;
            }
        }
        .search-main-item {
            padding: 16px;
            box-sizing: border-box;
            .title {
                margin-top: 30px;
                margin-bottom: 40px;
                font-size: $font-size-28;
                color: $color-text-959595;
            }
            .hot {
                &-list {
                    padding: 0 20px;
                    @include flexStartCenterWrap();
                    &-item {
                        margin-right: 20px;
                        margin-bottom: 20px;
                        padding: 10px 16px;
                        border-radius: 6px;
                        color: $color-text-333;
                        font-size: $font-size-22;
                        background-color: $color-background-d7d7d7;
                    }
                }
            }
        }
        .search-main-movie {
            width: 100%;
            height: calc(100% - 90px);
            &-title {
                width: 100%;
                height: 90px;
                line-height: 90px;
                text-align: center;
                position: sticky;
                top: 0;
                left: 0;
                z-index: 9;
                background-color: $color-background-white;
                font-size: $font-size-24;
                border-bottom: 1px solid #ebedf0;
                span {
                    color: $color-theme;
                    font-size: $font-size-28;
                }
            }
            &-box {
                width: 100%;
                height: calc(100% - 300px);
            }
            &-list {
                width: 100%;
                height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
            }
            &-wrap {
                width: 100%;
                height: 100%;
                padding: 16px;
                box-sizing: border-box;
            }
        }
    }
    .search-swipe {
        width: 100%;
        margin-top: 20px;
        padding: 0 16px;
        box-sizing: border-box;
        .search-swipe-wrap {
            width: 100%;
            height: 200px;
            .van-swipe-item {
                width: 100%;
                height: 100%;
            }
            img {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: cover;
            }
        }
    }
    .search-under {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 0;
    }
}
</style>
