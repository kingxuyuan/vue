<template>
    <div class="loading">
        <div class="loading-content">
            <div class="spin"></div>
            <p class="desc">{{ title }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    name: 'Loading',
    setup() {
        const state = reactive({
            title: '正在载入...',
        });

        /** 设置标题 */
        function setTitle(title: string) {
            state.title = title;
        }

        return {
            ...toRefs(state),

            setTitle,
        };
    },
});
</script>

<style scoped lang="scss">
.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    height: 100%;
    @include flexColumnCenter();
    .loading-content {
        text-align: center;
        background: $color-background-deep-masking;
        @include flexColumnCenter();
        width: 240px;
        height: 240px;
        border-radius: 20px;
        .spin {
            width: 50px;
            height: 50px;
            border: 3px solid #d0d3d4;
            border-top-color: #626567;
            border-radius: 50%;
            animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
        .desc {
            line-height: 20px;
            margin-top: 40px;
            color: $color-text-white;
            font-size: $font-size-26;
        }
    }
}
</style>
