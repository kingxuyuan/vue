<template>
    <van-overlay class="my-overlay" :show="show" @click="closeOverlay">
        <template v-for="(item, idx) in notices">
            <div
                class="wrap"
                :key="idx"
                v-if="item.show"
                @click.stop="knowClick(item, idx)"
            >
                <div class="officenotice popup-ad">
                    <div class="officenotice-item">
                        <h1>{{ item.title }}</h1>
                        <div
                            class="officenotice-item-content"
                            v-html="item.content"
                        ></div>
                        <div class="btn">我知道了</div>
                    </div>
                </div>
            </div>
        </template>

        <div v-show="!noticesShow">
            <template v-for="(pItem, pIdx) in popupAd">
                <div
                    class="wrap"
                    :key="pItem?.id"
                    v-if="pItem.show"
                    @click.stop="closePopop(pItem, pIdx)"
                >
                    <div class="popup-ad ads1">
                        <div class="popup-ad-item">
                            <v-image :src="pItem?.pic" />
                            <div class="close"></div>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <div class="popup-ad ads2" v-show="popupListShow">
            <div class="ads2-wrap">
                <div class="close" @click="closeOverlay">跳过</div>
                <div class="ads2-list">
                    <div
                        class="ads2-list-item"
                        v-for="item in popupAdList"
                        :key="item.id"
                        @click.stop="popupItemClick(item.url)"
                    >
                        <v-image :src="item.pic" />
                        <p>{{ item.title }}</p>
                        <div class="btn">安装</div>
                    </div>
                </div>
            </div>
        </div>
    </van-overlay>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import {
    OfficeNoticeDataType,
    NoticesItem,
    PopupAdItem,
} from '@/types/component/home';
import sessionCache from '@/utils/sessionStorage';

export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        const show = ref(true);
        const list = computed(() => store.state.config.config.data.msgHomeList);
        const popupAd = computed(() => store.state.active.active.data.popup_ad);
        const popupAdList = computed(
            () => store.state.active.active.data.button_popup_ads,
        );
        let data = reactive({
            notices: [],
            popupAd: [],
            noticesShow: true,
            popupListShow: false,
        }) as OfficeNoticeDataType;

        const knowClick = (item: NoticesItem, idx: number) => {
            if (idx === data.notices.length - 1) {
                data.noticesShow = false;
            }
            item.show = false;
        };

        const closePopop = (item: PopupAdItem, idx: number) => {
            if (idx < data.popupAd.length - 1) {
                const newIdx = idx + 1;
                data.popupAd[newIdx].show = true;
            }
            if (idx === data.popupAd.length - 1) {
                data.popupListShow = true;
            }
            item.show = false;
        };

        const closeOverlay = () => {
            show.value = false;
            //控制弹框
            sessionCache.sessionSet('showAd', 1);
        };

        const popupItemClick = (url: string) => {
            router.push(`/iframe?src=${url.trim()}`);
        };

        const filterList = (prevArr: any[], bool?: boolean) => {
            return prevArr.map((item, idx) => {
                let show = true;
                if (bool && idx !== 0) {
                    show = false;
                }
                return {
                    ...item,
                    show,
                };
            });
        };

        watch(
            () => list.value,
            (val) => {
                if (val) {
                    data.notices = filterList(val);
                }
            },
            { immediate: true },
        );

        watch(
            () => popupAd.value,
            (val) => {
                if (val) {
                    data.popupAd = filterList(val, true);
                }
            },
            { immediate: true },
        );

        return {
            show,
            popupAdList,
            ...toRefs(data),
            knowClick,
            closePopop,
            closeOverlay,
            popupItemClick,
        };
    },
});
</script>

<style lang="scss" scoped>
.my-overlay {
    width: 100%;
    z-index: 100;
}
.wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &:first-child,
    .officenotice {
        z-index: 109;
    }
}
.officenotice {
    width: 560px;
    height: 800px;
    overflow: hidden;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position-y: -2px;
    background-image: url('../../assets/images/dialog/home_notice_dialog.png');
    &-item {
        width: 100%;
        height: 100%;
        h1 {
            padding-top: 235px;
            margin-bottom: 34px;
            text-align: center;
            font-size: $font-size-40;
            font-weight: 600;
        }
        &-content {
            width: 70%;
            height: 330px;
            margin: auto;
            font-size: $font-size-30;
            overflow-x: hidden;
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        .btn {
            width: 200px;
            height: 66px;
            line-height: 66px;
            text-align: center;
            margin: 40px auto 0;
            color: $color-text-white;
            font-size: $font-size-28;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url('../../assets/images/dialog/btn.png');
        }
    }
}
.popup-ad {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.ads1 {
    width: 560px;
    margin: 0 auto;
    .popup-ad-item {
        position: relative;
        img {
            width: 100%;
            min-height: 580px;
            display: block;
            object-fit: cover;
            border-radius: 15px;
        }
        .close {
            position: absolute;
            top: -60px;
            right: -60px;
            width: 80px;
            height: 80px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url('../../assets/images/dialog/close.png');
        }
    }
}
.ads2 {
    width: 650px;
    height: 800px;
    &-wrap {
        height: 100%;
        position: relative;
        .close {
            position: absolute;
            top: -130px;
            right: 0px;
            padding: 10px 20px;
            color: $color-text-white;
            font-size: $font-size-40;
        }
    }
    &-list {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        @include flexBetweenCenterWrap();
        &-item {
            width: 30%;
            margin-bottom: 40px;
            @include flexColumnCenter();
            img {
                width: 120px;
                height: 120px;
                display: block;
                object-fit: cover;
                border-radius: 15px;
            }
            p {
                width: 180px;
                margin: 20px auto;
                text-align: center;
                font-size: $font-size-24;
                color: $color-text-white;
                @include overflowEllipsis();
            }
            .btn {
                width: 130px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                border-radius: 80px;
                font-size: $font-size-26;
                color: $color-text-white;
                background: linear-gradient(
                    to right,
                    $color-background-theme,
                    $color-background-details1
                );
            }
        }
    }
}
</style>

<style lang="scss">
.officenotice {
    &-item {
        &-content {
            line-height: 1.4;
        }
    }
}
</style>
