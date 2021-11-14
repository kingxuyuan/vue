<template>
    <div class="movies-item" :key="item?.id" @click="jumpPlayer(item?.id)">
        <div class="movies-item-box">
            <v-image :src="item?.cover" />
            <div
                class="movie-btn movie-price"
                :class="{ 'movie-free': item?.type === 1 }"
            >
                {{
                    item?.is_buy == 1
                        ? '已购'
                        : returnMovieType(item?.type, item?.price)
                }}
            </div>
            <div class="movie-btn movie-duration" v-if="item?.duration">
                {{ item?.duration }}
            </div>
        </div>
        <p class="movies-item-title">{{ item?.title }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { returnMovieType } from '@/utils/tools';
import { MoviesItemType } from '@/types/component/movieItem';

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<MoviesItemType>,
        },
    },
    setup(porps) {
        const router = useRouter();
        const jumpPlayer = (movieId: number | undefined) => {
            router.push({
                path: '/player',
                query: {
                    movieId,
                },
            });
        };
        return {
            jumpPlayer,
            returnMovieType,
        };
    },
});
</script>

<style lang="scss" scoped>
.movies {
    &-item {
        width: 50%;
        float: left;
        box-sizing: border-box;
        &:nth-child(2n) {
            padding-left: 5px;
        }
        &:nth-child(2n + 1) {
            padding-right: 5px;
        }
        &-title {
            font-size: $font-size-26;
            margin-top: 10px;
            padding-bottom: 10px;
            @include overflowEllipsis();
        }
        &-box {
            height: 200px;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
                object-fit: cover;
            }
        }
    }
}
</style>
