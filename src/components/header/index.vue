<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="km-header">
        <van-nav-bar
            :title="title"
            :left-text="leftText"
            :right-text="rightText"
            :left-arrow="leftArrow"
            :border="border"
            :fixed="fixed"
            :placeholder="placeholder"
            :z-index="zIndex"
            :safe-area-inset-top="safeAreaInsetTop"
            @click-left="clickLeft"
        >
            <template #right>
                <slot name="right" />
            </template>
        </van-nav-bar>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store';

export default defineComponent({
    props: {
        title: {
            type: String,
            default: '',
        },
        leftText: {
            type: String,
            default: '',
        },
        rightText: {
            type: String,
            default: '',
        },
        leftArrow: {
            type: Boolean,
            default: false,
        },
        border: {
            type: Boolean,
            default: true,
        },
        fixed: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: Boolean,
            default: false,
        },
        zIndex: {
            type: Number,
            default: 1,
        },
        safeAreaInsetTop: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['clickRight'],
    setup(props, { emit }) {
        const router = useRouter();
        const store = useStore();
        const route = useRoute();
        const clickLeft = () => {
            let prevPath = store.getters.getterPath.from;
            let nextPath = store.getters.getterPath.to;
            if (['/', '/player', '/iframe'].includes(prevPath)) {
                if (
                    ['/recharge', '/member'].includes(nextPath) &&
                    !['/iframe'].includes(nextPath)
                ) {
                    router.back();
                } else {
                    router.push('/');
                }
            } else {
                router.back();
            }
        };
        const clickRight = () => {
            emit('clickRight');
        };
        return {
            clickLeft,
            clickRight,
        };
    },
});
</script>

<style scoped lang="scss">
.km-header {
    width: 100%;
    height: auto;
}
</style>
