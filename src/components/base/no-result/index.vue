<template>
    <div class="no-result">
        <div class="no-result-content">
            <div class="icon">
                <img :src="images.noResult" alt="" />
                <p class="text">{{ title }}</p>
                <div class="replay" @click="replay">刷新</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import images from '@/assets/images/base';

export default defineComponent({
    name: 'NoResult',
    setup() {
        const title = ref('抱歉，没有结果');

        /** 设置标题 */
        function setTitle(str: string) {
            title.value = str;
        }
        const replay = () => {
            window.location.reload();
        };

        return {
            title,
            images,
            setTitle,
            replay,
        };
    },
});
</script>

<style scoped lang="scss">
.no-result {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    height: 100%;
    .no-result-content {
        text-align: center;
        width: 100%;
        height: 100%;
        // background: $color-background-masking;
        .icon {
            width: 100%;
            height: 100%;
            margin: 0 auto;
            background-size: 100%;
            @include flexColumnCenter();
            img {
                width: 80px;
                height: auto;
                margin-bottom: 20px;
            }
            .icon-noresult {
                width: 50px;
                height: 50px;
                font-size: $font-size-26;
            }
        }

        .text {
            color: $color-text-333;
            font-size: $font-size-26;
            margin-bottom: 40px;
        }
        .replay {
            min-width: 80px;
            min-height: 50px;
            background: #f99c10;
            line-height: 50px;
            border-radius: 10px;
            color: #fff;
        }
    }
}
</style>
