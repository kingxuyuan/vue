<template>
    <div class="movies-page">
        <v-header left-arrow :title="movieTitle" />

        <div class="movies-page-wrap">
            <div class="movies-page-box">
                <Refresh
                    :loading="moviesInfo.loading"
                    :finished="moviesInfo.noResult"
                    :movies="moviesInfo.data.list"
                    @onRefresh="onRefresh"
                    @onload="onload"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    reactive,
    toRefs,
    watch,
    onActivated,
    onDeactivated,
} from 'vue';
import { useRoute } from 'vue-router';

import { useStore } from '@/store';
import { moviesActionTypes } from '@/store/modules/movies/action-types';
import { moviesMutationTypes } from '@/store/modules/movies/mutation-types';
import Cache from '@/utils/localStorage';

import Refresh from '@/components/refresh/Refresh.vue';

export default defineComponent({
    name: 'Movies',
    components: {
        Refresh,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const moviesInfo = computed(() => store.getters.getterMovies);

        let data = reactive({
            page: 1,
            active: 0,
            timeout: null as any,
            loadingText: '加载中...',
            movieTitle: Cache.localGet('movieTitle') || '',
            tabsList: [
                { id: 1, title: '最近播放' },
                { id: 2, title: '热播榜' },
                { id: 3, title: '好评榜' },
            ],
        });

        const tabsChange = () => {};

        const onload = () => {
            getMoviesData();
        };

        const onRefresh = (callback?: () => void) => {
            data.page = 1;
            data.timeout = setTimeout(() => {
                store.commit(
                    moviesMutationTypes.INIT_MOVIES_MUTATION,
                    getMoviesData,
                );
                callback && callback();
            }, 500);
        };

        const getMoviesData = () => {
            const id = route.query.id as string;
            store.dispatch(moviesActionTypes.MOVIES_ACTION, {
                id: parseInt(id),
                type: 1,
                page: data.page,
                row: 16,
                show_discount: 1,
            });
        };

        onActivated(() => {
            onRefresh();
            data.movieTitle = Cache.localGet('movieTitle') || '';
        });

        onDeactivated(() => {
            data.timeout && clearTimeout(data.timeout);
            store.commit(moviesMutationTypes.INIT_MOVIES_MUTATION);
            data.page = 1;
        });

        watch(
            () => moviesInfo.value.data.list,
            (newVal, prevVal) => {
                if (newVal.length >= prevVal.length) data.page++;
            },
        );

        return {
            moviesInfo,
            ...toRefs(data),
            tabsChange,
            onload,
            onRefresh,
        };
    },
});
</script>

<style lang="scss" scoped>
.movies-page {
    width: 100%;
    @include flexColumnStartCenter();
    &-main {
        flex: 1;
        width: 100%;
        overflow: hidden;
    }
    &-wrap {
        flex: 1;
        width: 100%;
        padding: 16px;
        overflow: hidden;
        box-sizing: border-box;
    }
    &-box {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>

<style lang="scss">
.movies-page-main {
    .van-tabs__nav {
        width: 60%;
        margin: auto;
        .van-tab--active {
            color: $color-theme;
        }
        .van-tabs__line {
            background: $color-background-theme;
        }
        .van-tabs__content {
            height: 100%;
        }
    }
}
</style>
