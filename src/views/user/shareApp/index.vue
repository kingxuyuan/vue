<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="share-app">
        <v-header left-arrow title="邀请分享" fixed />
        <div class="share-content">
            <img src="@/assets/images/user/user-share_bg.png" alt="" />
            <div id="qrcode" class="share-qrcode"></div>
            <div
                class="link-copy"
                @click="
                    (e) =>
                        handleClipboard(
                            getShareQR.promo_links,
                            e,
                            '复制成功，快去分享吧',
                        )
                "
            >
                复制链接
            </div>
        </div>
        <div class="share-record" v-if="gerRecord.length > 0">
            <div class="record-title">推广记录</div>
            <div class="record-content">
                <div
                    v-for="item in gerRecord"
                    :key="item.id"
                    class="record-content-item"
                >
                    <span>{{ item.account }}</span>
                    <span class="time">{{ item.create_time }}</span>
                    <span class="content">{{ item.content }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, watch } from 'vue';
import { userActionTypes } from '@/store/modules/user/action-types';
import { handleClipboard } from '@/utils/clipboard';
import { useStore } from '@/store';
import QRCode from 'qrcodejs2';

export default defineComponent({
    setup() {
        const store = useStore();
        const getShareQR = computed(() => store.getters.getterShareData);
        const gerRecord = computed(() => store.getters.getterShareQRrecord);
        const getShare = () => {
            store.dispatch(userActionTypes.GET_SHAREQRDATA);
        };

        const getShareRecord = () => {
            store.dispatch(userActionTypes.GET_SHAREQRDATARECORED);
        };
        onMounted(() => {
            getShare();
            getShareRecord();
        });

        watch(
            () => getShareQR.value.promo_links,
            (val) => {
                if (val) {
                    new QRCode('qrcode', {
                        text: val,
                        width: 128,
                        height: 128,
                        colorDark: '#000000',
                        colorLight: '#ffffff',
                    });
                }
            },
        );
        return {
            getShareQR,
            handleClipboard,
            gerRecord,
        };
    },
});
</script>

<style scoped lang="scss">
.share-app {
    :deep(.km-header) {
        position: absolute;
        z-index: 9;
        left: 0;
        top: 0;
    }
    .share-content {
        width: 100%;
        min-height: 100%;
        position: relative;
        padding-top: 60px;
        img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }
        .share-qrcode {
            position: absolute;
            top: 980px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
        }
        .link-copy {
            position: absolute;
            top: 1280px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
            width: 200px;
            height: 44px;
            border: 2px solid $color-text-959595;
            border-radius: 20px;
            @include flexCenter();
            font-size: $font-size-28;
            color: $color-text-white;
        }
    }
    .share-record {
        background: #f5952a;
        position: relative;
        top: -4px;
        @include flexColumnCenter();
        padding: 0 40px;
        .record-title {
            color: $color-text-white;
            margin: 30px 0;
            font-size: $font-size-30;
        }
        .record-content {
            width: 100%;
            margin: 0 auto 50px;
            border: 8px solid #f3a44a;
            border-radius: 20px;
            box-sizing: border-box;
            &-item {
                @include flexBetweenCenter();
                height: 60px;
                background: #e07c08;
                color: $color-text-white;
                border-bottom: 1px solid $color-text-d2d2d2;
                padding: 0 10px;
                .time {
                    flex: 1;
                    text-align: center;
                }
                .content {
                    width: 28%;
                }
            }
        }
    }
}
</style>
