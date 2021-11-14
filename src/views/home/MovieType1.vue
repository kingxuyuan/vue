<template>
    <div class="movie-type1" v-loading:[loadingText]="toastLoad">
        <div class="movie-type1-cover">
            <Refresh
                :loading="loading"
                :finished="noResult"
                :movies="currMoives"
                @onRefresh="onRefresh"
                @onload="onload"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs,
    watch,
    onMounted,
    onUnmounted,
    computed,
    onActivated,
} from 'vue';

import Refresh from '@/components/refresh/Refresh.vue';
import { index } from '@/api/home';
import _ from 'lodash';
import { useStore } from '@/store';
import { configActionTypes } from '@/store/modules/config/action-types';
import { Toast } from 'vant';
Toast.allowMultiple();

export default defineComponent({
    name: 'MovieType1',
    props: {
        id: {
            type: Number,
            default: 0,
        },
    },
    components: {
        Refresh,
    },
    setup(props) {
        let data = reactive({
            page: 1,
            type: '',
            timeout: null as any,
            toastLoad: null as any,
            loadingText: '加载中...',
            refreshing: false,
            loading: false,
            noResult: false,
            allMoives: [] as any[],
            currMoives: [],
        });

        const store = useStore();
        const fromPath = computed(() => store.getters.getterPath);

        const getMovies = async () => {
            data.loading = true;
            data.noResult = false;
            const result: any = await index({
                category_id: props.id,
                type_id: 0,
                sub_category_id: 2,
                product_id: '',
                page: data.page,
                row: 12,
            });
            data.toastLoad = false;

            if (result.code === 0 && result?.data?.list?.length > 0) {
                data.loading = false;
                data.noResult = false;
                let isInclude = data.allMoives.some(
                    (item) => item.category_id === props.id,
                );
                if (!isInclude) {
                    data.allMoives = [...data.allMoives, { ...result.data }];
                } else {
                    let currMovies = _.cloneDeep(data.allMoives).map(
                        (item: any) => {
                            if (item.category_id === props.id) {
                                item.list = [...item.list, ...result.data.list];
                            }
                            return { ...item };
                        },
                    );
                    data.allMoives = [...currMovies];
                }

                data.currMoives = data.allMoives.find(
                    (item) => item.category_id === props.id,
                ).list;
            } else {
                data.loading = false;
                data.noResult = true;
            }
        };

        const onload = () => {
            getMovies();
        };

        const onRefresh = (callback?: () => void) => {
            data.page = 1;
            data.timeout = setTimeout(async () => {
                data.allMoives = [];
                data.currMoives = [];
                await getMovies();
                callback && callback();
            }, 500);
        };

        watch(
            () => data.currMoives,
            (newVal, prevVal) => {
                if (newVal.length > prevVal.length) data.page++;
            },
        );

        //更新购买状态的数据
        onActivated(() => {
            if (fromPath.value.from.includes('/player')) {
                onRefresh();
                store.dispatch(configActionTypes.GET_PATH, {
                    to: fromPath.value.to,
                    from: '/',
                });
            }
        });

        onMounted(() => {
            data.toastLoad = true;
            getMovies();
        });

        onUnmounted(() => {
            data.page = 1;
            data.timeout && clearTimeout(data.timeout);
            data.currMoives = [];
        });

        return {
            ...toRefs(data),
            onRefresh,
            onload,
        };
    },
});
</script>

<style lang="scss" scoped>
.movie-type1 {
    width: 100%;
    height: 100%;
    &-cover {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
}
</style>
<style>
.movie-type1 .movies-item {
    padding: 16px;
}
</style>
