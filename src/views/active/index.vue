<template>
    <div class="active">
        <van-tabs sticky color="#f99c10">
            <van-tab title="活动" active>
                <div class="active-content">
                    <div class="active-banner">
                        <van-swipe
                            class="active-swipe"
                            :autoplay="3000"
                            indicator-color="#f99c10"
                        >
                            <van-swipe-item
                                v-for="item in activeData.activity_banner"
                                :key="item.id"
                            >
                                <router-link
                                    :to="`/iframe?src=${item.url.trim()}`"
                                >
                                    <v-image :src="item.pic"></v-image>
                                </router-link>
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                    <div class="active-list">
                        <div
                            class="active-list-item"
                            v-for="item in activeData.activity_list"
                            :key="item.id"
                        >
                            <router-link :to="`/iframe?src=${item.url.trim()}`">
                                <v-image :src="item.pic"></v-image>
                            </router-link>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useStore } from '@/store';

export default defineComponent({
    setup() {
        const store = useStore();

        const activeData = computed(() => store.getters.getterActiveData);

        return { activeData };
    },
});
</script>

<style lang="scss" scoped>
.active {
    width: 100%;

    a {
        display: block;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .active-content {
        width: 100%;
        height: 100%;
        padding-bottom: 100px;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    &-banner {
        width: calc(100% - 40px);
        height: 400px;
        margin: 15px auto 0;
        border-radius: 15px;
        .active-swipe {
            width: 100%;
            height: 100%;
            border-radius: 15px;
            a {
                width: 100%;
                height: 100%;
            }
        }
    }
    &-list {
        width: calc(100% - 40px);
        @include flexColumnStart();
        margin: 50px auto 0;

        &-item {
            width: 100%;
            height: 160px;
            margin-bottom: 20px;
            @include flexCenter();

            a {
                width: 100%;
                height: 100%;
                border-radius: 15px;
                img {
                    border-radius: 15px;
                }
            }
        }
    }
}
</style>
