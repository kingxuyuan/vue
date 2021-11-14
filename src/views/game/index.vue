<template>
    <div class="game" v-no-result:[noResultText]="noResult">
        <iframe :src="gameUrl" frameborder="0" ref="iframeRef"></iframe>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    toRefs,
    onActivated,
    onDeactivated,
} from 'vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getGame } from '@/api/game';
import { Toast } from 'vant';
Toast.allowMultiple();

export default defineComponent({
    setup() {
        const gameUrl = ref('');
        const data = reactive({
            loadingText: '加载中...',
            noResultText: '暂无游戏',
            noResult: false,
            toast: null as any,
        });
        const getGameUrl = async () => {
            const result: any = await getGame();
            if (result.code === 0) {
                gameUrl.value = result.data.url;
            } else {
                data.noResult = true;
            }
        };

        const iframeRef = ref();

        onActivated(() => {
            NProgress.start();
            data.toast = Toast.loading({
                message: '加载中...',
                forbidClick: false,
                duration: 0,
            });
            if (iframeRef.value.attachEvent) {
                iframeRef.value.attachEvent('onload', function () {
                    NProgress.done();
                    data.toast.clear();
                });
            } else {
                iframeRef.value.addEventListener(
                    'load',
                    function () {
                        NProgress.done();
                        data.toast.clear();
                    },
                    false,
                );
            }
        });
        onMounted(() => {
            getGameUrl();
        });
        onDeactivated(() => {
            NProgress.done();
            data.toast.clear();
        });
        return {
            gameUrl,
            ...toRefs(data),
            iframeRef,
        };
    },
});
</script>

<style scoped lang="scss">
.game {
    iframe {
        width: 100%;
        height: 100%;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
