<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="iframe" v-if="isOpen">
        <div class="iframe-back" @click="close">
            <van-icon name="arrow-left" color="#f99c10" />
        </div>
        <iframe :src="openUrl" frameborder="0" ref="iframeRef"> </iframe>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    watch,
    ref,
    computed,
    onActivated,
    onDeactivated,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import { Toast } from 'vant';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });
Toast.allowMultiple();

export default defineComponent({
    setup() {
        const isOpen = ref(false);
        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        const openUrl = ref('');
        const iframeRef = ref();
        const toast = ref();

        const fromPath = computed(() => store.getters.getterPath);

        const close = () => {
            if (fromPath.value.from) {
                router.replace(fromPath.value.from);
            } else {
                router.push('/');
            }
            isOpen.value = false;
        };

        onActivated(() => {
            NProgress.start();
            toast.value = Toast.loading({
                message: '加载中...',
                forbidClick: false,
                duration: 0,
            });
            if (iframeRef.value.attachEvent) {
                iframeRef.value.attachEvent('onload', function () {
                    NProgress.done();
                    toast.value.clear();
                });
            } else {
                iframeRef.value.addEventListener(
                    'load',
                    function () {
                        NProgress.done();
                        toast.value.clear();
                    },
                    false,
                );
            }
        });
        onDeactivated(() => {
            NProgress.done();
            toast.value.clear();
        });

        watch(
            () => route.query.src,
            (val) => {
                if (val) {
                    let webUrl = window.location.search.split('?src=')[1];

                    openUrl.value = webUrl;
                    isOpen.value = true;
                }
            },
            {
                immediate: true,
            },
        );
        return {
            route,
            close,
            isOpen,
            openUrl,
            iframeRef,
        };
    },
});
</script>

<style scoped lang="scss">
.iframe {
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background-white;
    .iframe-back {
        width: 80px;
        height: 80px;
        background: $color-background-masking;
        position: absolute;
        z-index: 99;
        left: 20px;
        top: 20px;
        border-radius: 50%;
        font-size: $font-size-48;
        @include flexCenter();
    }
    iframe {
        width: 100%;
        height: 100%;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
