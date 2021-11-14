<template>
    <van-pull-refresh v-model="refreshing" @refresh="onRefreshfn">
        <van-list
            v-model:loading="privateLoading"
            :finished="finished"
            finished-text="没有更多了"
            loading-text="拼命加载中"
            @load="onLoad"
            :immediate-check="false"
        >
            <div class="moives van-clearfix">
                <MovieItem
                    v-for="item in movies"
                    :key="item?.id"
                    :item="item"
                />
            </div>
        </van-list>
    </van-pull-refresh>
</template>

<script lang="ts">
import _ from 'lodash';
import { defineComponent, reactive, toRefs, PropType, watch } from 'vue';
import MovieItem from './MovieItem.vue';
import { MoviesItemType } from '@/types/component/movieItem';

export default defineComponent({
    components: {
        MovieItem,
    },
    props: {
        loading: {
            type: Boolean,
        },
        finished: {
            type: Boolean,
        },
        movies: {
            type: Array as PropType<MoviesItemType[]>,
        },
    },
    emits: ['onload', 'onRefresh'],
    setup(props, { emit }) {
        const data = reactive({
            privateLoading: false,
            refreshing: false,
        });

        const onLoad = () => {
            onLoadData();
        };
        const onLoadData = _.debounce(
            () => {
                emit('onload');
            },
            200,
            // {
            //     leading: true, 加载就执行
            //     trailing: false,
            // },
        );

        const onRefreshfn = () => {
            emit('onRefresh', updateRefresh);
        };

        const updateRefresh = () => {
            data.refreshing = false;
        };

        watch(
            () => props.loading,
            (val) => {
                data.privateLoading = val;
            },
            { immediate: true },
        );

        return {
            ...toRefs(data),
            onLoad,
            onRefreshfn,
        };
    },
});
</script>

<style lang="scss" scoped>
.moives {
    width: 100%;
    height: 100%;
    min-height: 50px;
    position: relative;
    .moives-loading {
        width: 100%;
        text-align: center;
        padding-top: 20px;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: $color-background-white;
    }
}
</style>
