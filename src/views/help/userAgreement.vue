<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div
        class="user-agreement"
        v-loading:[loadingText]="loading"
        v-no-result:[noResultText]="noResult"
    >
        <v-header left-arrow title="用户协议" fixed />
        <div class="user-agreement-cover">
            <div class="user-agreement-content" v-html="contnet"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { getUserAgreement } from '@/api/login';

export default defineComponent({
    setup() {
        const agreeMentContent = reactive({
            contnet: '',
        });

        const data = reactive({
            loadingText: '加载中...',
            noResultText: '暂无内容',
            loading: false,
            noResult: false,
        });
        onMounted(async () => {
            data.loading = true;
            let result: any = await getUserAgreement();
            data.loading = false;

            if (result.code === 0) {
                agreeMentContent.contnet = result.data.content;
            } else {
                data.noResult = true;
            }
        });
        return {
            ...toRefs(agreeMentContent),
            ...toRefs(data),
        };
    },
});
</script>

<style scoped lang="scss">
.user-agreement {
    .user-agreement-cover {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .user-agreement-content {
        padding: 120px 20px 40px;
    }
}
</style>
