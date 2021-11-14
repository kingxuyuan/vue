<template>
    <div class="recommend">
        <div class="recommend-title">猜你喜欢</div>
        <Refresh
            :movies="recommends?.list"
            :loading="loading"
            :finished="noResult"
            @onload="onload"
        />
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    watch,
    ref,
    onActivated,
    onDeactivated,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useStore } from '@/store';
import { playerActionTypes } from '@/store/modules/player/action-types';
import { playerMutationTypes } from '@/store/modules/player/mutation-types';

import Refresh from '@/components/refresh/Refresh.vue';

export default defineComponent({
    components: {
        Refresh,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const recommends = computed(() => store.getters.getterGuessLike.data);
        const loading = computed(() => store.getters.getterGuessLike.loading);
        const noResult = computed(() => store.getters.getterGuessLike.noResult);

        let page = ref(1);

        const getGuessLikeData = () => {
            const id = route.query.movieId as string;

            store.dispatch(playerActionTypes.GET_GUESSLIKE, {
                id,
                page: page.value,
            });
        };

        const onload = () => {
            getGuessLikeData();
        };

        watch(
            () => recommends.value.list,
            (newVal) => {
                if (newVal.length > 0) page.value++;
            },
        );
        onActivated(() => {
            getGuessLikeData();
        });
        onDeactivated(() => {
            store.commit(playerMutationTypes.TOGGLE_GUESS_LIKE, {
                loading: false,
                noResult: false,
                data: {
                    list: [],
                },
            });
            page.value = 1;
        });
        return {
            loading,
            recommends,
            noResult,
            onload,
        };
    },
});
</script>

<style lang="scss" scoped>
.recommend {
    padding: 16px;
    box-sizing: border-box;
    &-title {
        font-size: $font-size-32;
        font-weight: 600;
        margin-bottom: 30px;
        color: $color-text-333;
    }
}
</style>

<style lang="scss">
.recommend {
    .movies-item {
        &:nth-child(odd) {
            padding-right: 8px;
        }
        &:nth-child(even) {
            padding-left: 8px;
        }
    }
    .movies-item-box {
        border-radius: 10px;
        overflow: hidden;
    }
    .movies-item-title {
        margin-top: 14px;
        margin-bottom: 20px;
        font-size: $font-size-26;
    }
}
</style>
