<template>
    <div class="home">
        <div class="home-content">
            <div class="search">
                <div class="search-left" @click="goToSearch">
                    <img src="../../assets/images/home/search.png" alt="" />
                    <div>请输入你想找的关键字</div>
                </div>
                <div class="search-right"></div>
            </div>

            <div class="home-content-wrap">
                <van-tabs
                    class="movie-tabs"
                    v-model:active="active"
                    @change="tabsChange"
                    swipeable
                    v-if="tabsList?.length > 0"
                >
                    <van-tab
                        v-for="item in tabsList"
                        :key="item.id"
                        :name="item.id"
                        :title="item.title"
                    >
                        <keep-alive>
                            <MovieType1
                                :id="active"
                                v-if="item.type === 1 && item.id === active"
                            />
                        </keep-alive>

                        <!-- 首页类型的组件 -->
                        <keep-alive>
                            <MovieType2
                                :id="active"
                                v-if="item.type === 2 && item.id === active"
                            />
                        </keep-alive>
                    </van-tab>
                </van-tabs>
            </div>
        </div>

        <AdInit @loadData="loadData"></AdInit>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import MovieType1 from './MovieType1.vue';
import MovieType2 from './MovieType2.vue';
import { configMutationTypes } from '@/store/modules/config/mutation-types';
import sessionCache from '@/utils/sessionStorage';
import AdInit from '@/views/adInit/index.vue';

export default defineComponent({
    components: {
        MovieType1,
        MovieType2,
        AdInit,
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const tabsList = computed(
            () => store.state.config?.config?.data?.categoryV2?.list,
        );

        let data = reactive({
            active: parseInt(sessionCache.sessionGet('tabsActive')),
            showOverlay: sessionCache.sessionGet('overlay') || 'false',
            time: null as any,
        });

        const tabsChange = (key: number) => {
            sessionCache.sessionSet('tabsActive', key);
            data.active = parseInt(sessionCache.sessionGet('tabsActive'));
        };

        const goToSearch = () => {
            router.push('/search');
        };

        const loadData = (tabList: any[]) => {
            if (tabList.length > 0) {
                let allTabs = [];
                let output = (item: any, time: number) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            data.active = item.id;
                            resolve(item.id);
                        }, 1250 * time);
                    });
                for (let i = 0; i < tabList.length; i++) {
                    allTabs.push(output(tabList[i], i));
                }
                Promise.all(allTabs).then((res) => {
                    if (allTabs.length === tabList.length) {
                        setTimeout(() => {
                            data.active = tabList[0].id;
                            store.commit(
                                configMutationTypes.SET_LOADHOME,
                                true,
                            );
                        }, 1000);
                    }
                });
            }
        };

        return {
            tabsList,
            ...toRefs(data),
            tabsChange,
            goToSearch,
            loadData,
        };
    },
});
</script>

<style scoped lang="scss">
.home {
    &-content {
        height: 100%;
        img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }
        .search {
            width: 100%;
            height: 80px;
            padding: 0 20px;
            position: sticky;
            top: 0;
            left: 0;
            z-index: 10;
            box-sizing: border-box;
            background: $color-background-white;
            @include flexStartCenter();
            &-left {
                width: 100%;
                height: 60px;
                padding-left: 30px;
                border-radius: 60px;
                box-sizing: border-box;
                @include flexStartCenter();
                background-color: $color-background-245;
                img {
                    width: 30px;
                    display: block;
                }
                div {
                    flex: 1;
                    height: 100%;
                    line-height: 64px;
                    margin-left: 16px;
                    font-size: $font-size-28;
                    letter-spacing: 1px;
                    color: $color-text-51;
                    box-sizing: border-box;
                }
            }
        }
        &-wrap {
            height: calc(100% - 80px);
        }
    }
}
</style>
