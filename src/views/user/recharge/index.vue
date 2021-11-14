<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="recharge">
        <v-header
            left-arrow
            title="充值中心"
            fixed
            @click-left="$router.back()"
        >
            <template #right>
                <span
                    class="record-text"
                    @click="$router.push('/rechargeRecord')"
                    >交易记录</span
                >
            </template>
        </v-header>

        <div class="recharge-content">
            <div class="recharge-title">
                <img
                    class="title-icon"
                    src="@/assets/images/user/title-line.png"
                />
                支付方式
            </div>

            <van-skeleton :row="3" :loading="!payList?.list?.length">
                <div class="recharge-type-list">
                    <div
                        class="recharge-type-cover"
                        v-for="(item, index) in payList.list"
                        :key="item.id"
                        @click="changeCurrent(index, item)"
                    >
                        <div
                            :class="[
                                'recharge-type-item',
                                { active: currentIndex === index },
                            ]"
                        >
                            <van-icon name="gold-coin-o" class="gold" />
                            {{ item.show_name }}
                        </div>
                    </div>
                </div>
            </van-skeleton>

            <div class="recharge-amount-list" v-if="payType !== 2">
                <div class="recharge-title">
                    <img
                        class="title-icon"
                        src="@/assets/images/user/title-line.png"
                    />
                    充值金额
                </div>
                <van-skeleton :row="3" :loading="!payAmountList?.list?.length">
                    <div class="recharge-amount">
                        <div
                            class="recharge-amount-cover"
                            v-for="(item, index) in payAmountList.list"
                            :key="item.id"
                            @click="changeAmountCurrent(index, item)"
                        >
                            <div
                                :class="[
                                    'recharge-amount-item',
                                    { active: currentAmountIndex === index },
                                ]"
                            >
                                ¥&nbsp;{{ item.price }}
                            </div>
                        </div>
                    </div>
                </van-skeleton>
            </div>

            <div class="chat-list" v-if="payType === 2">
                <div class="recharge-title">
                    <img
                        class="title-icon"
                        src="@/assets/images/user/title-line.png"
                    />
                    联系方式
                </div>
                <van-skeleton :row="3" :loading="!payAmountList?.list?.length">
                    <div class="chat-list-cover">
                        <div
                            class="chat-list-item"
                            v-for="item in payAmountList.list"
                            :key="item.id"
                        >
                            <span class="chat-name">{{ item.nick_name }}</span>
                            <div class="chat-type">
                                <div
                                    v-if="item.weixin"
                                    class="chat-type-wx"
                                    @click="
                                        (e) =>
                                            handleClipboard(
                                                item.weixin,
                                                e,
                                                '复制成功，快去微信添加吧',
                                            )
                                    "
                                >
                                    <img
                                        src="@/assets/images/user/icon_weixin.png"
                                        alt=""
                                        class="icon-wx"
                                    />
                                    微信
                                </div>
                                <div
                                    v-if="item.qq"
                                    class="chat-type-qq"
                                    @click="
                                        (e) =>
                                            handleClipboard(
                                                item.qq,
                                                e,
                                                '复制成功，快去QQ添加吧',
                                            )
                                    "
                                >
                                    <img
                                        src="@/assets/images/user/icon_qq.png"
                                        alt=""
                                        class="icon-qq"
                                    />
                                    QQ
                                </div>
                            </div>
                        </div>
                    </div>
                </van-skeleton>
            </div>
        </div>
        <div class="recharge-bottom">
            <div class="recharge-chat">
                <div class="recharge-chat-qq" v-if="isHttpUrl(payList.payqq)">
                    <router-link :to="`/iframe?src=${payList.payqq.trim()}`">
                        <img
                            src="@/assets/images/user/icon_help.png"
                            alt=""
                            class="icon-qq"
                        />
                        联系客服
                    </router-link>
                </div>
                <div
                    v-else
                    class="recharge-chat-qq"
                    @click="
                        (e) =>
                            handleClipboard(
                                payList.payqq,
                                e,
                                '复制成功，快去QQ添加吧',
                            )
                    "
                >
                    <img
                        src="@/assets/images/user/icon_qq.png"
                        alt=""
                        class="icon-qq"
                    />{{ payList.payqq }}
                </div>
            </div>
            <div class="recharge-btn" v-if="payType !== 2">
                <van-button
                    class="buy-btn"
                    type="primary"
                    round
                    @click="payOrder"
                    >立即充值</van-button
                >
            </div>
        </div>
        <!-- <a style="display: 'none'" href="" target="_blank" ref="payDom"></a> -->
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    computed,
    ref,
    watch,
    reactive,
} from 'vue';
import { useRouter } from 'vue-router';
import { userActionTypes } from '@/store/modules/user/action-types';
import { useStore } from '@/store';
import { PayListItemType, RechargeAmountItemType } from '@/types/api/user';
import { handleClipboard } from '@/utils/clipboard';
import { payRechargeAmount } from '@/api/user';
import { PayParamsType } from '@/types/api/user';
import { isHttpUrl } from '@/utils/tools';
import { Toast } from 'vant';
Toast.allowMultiple();

export default defineComponent({
    setup() {
        const store = useStore();
        const payList = computed(() => store.getters.getterPayList);
        const payAmountList = computed(() => store.getters.getterPayAmountList);
        const router = useRouter();
        const currentIndex = ref(0);
        const currentAmountIndex = ref(0);
        const payType = ref(0); //支付类型
        const payDom = ref<HTMLAnchorElement | null>(null);

        const payParams = reactive({
            payid: '',
            amount: '',
        }) as PayParamsType;

        const changeCurrent = (index: number, item: PayListItemType) => {
            currentIndex.value = index;
            payType.value = item.type;
            payParams.payid = item.id;
            getPayAmountList(item.id);
        };

        const changeAmountCurrent = (
            index: number,
            item: RechargeAmountItemType,
        ) => {
            currentAmountIndex.value = index;
            payParams.amount = item.price;
        };
        const getPayList = () => {
            store.dispatch(userActionTypes.GET_PAYLIST);
        };

        const getPayAmountList = (payid: number) => {
            store.dispatch(userActionTypes.GET_PAYAMOUNTLIST, { payid });
        };

        const payOrder = async () => {
            const toast = Toast.loading({
                message: '加载中...',
                forbidClick: false,
                duration: 0,
            });
            const result: any = await payRechargeAmount(payParams);
            toast.clear();
            if (result.code === 0) {
                // let target = payDom.value;
                // if (target) {
                //     target.setAttribute('href', result.data.url);
                //     target.click();
                // }
                router.push(`/iframe?src=${result.data.url.trim()}`);
            }
        };
        watch(
            () => payList.value,
            (val) => {
                if (val.list.length > 0) {
                    getPayAmountList(val.list[0].id);
                    payType.value = val.list[0].type;
                    payParams.payid = val.list[0].id;
                }
            },
        );

        watch(
            () => payAmountList.value,
            (val) => {
                if (val.list.length > 0) {
                    payParams.amount = val.list[0].price;
                }
            },
        );

        onMounted(() => {
            getPayList();
        });
        return {
            payList,
            payAmountList,
            currentIndex,
            changeCurrent,
            currentAmountIndex,
            changeAmountCurrent,
            handleClipboard,
            payType,
            payOrder,
            payDom,
            isHttpUrl,
        };
    },
});
</script>

<style scoped lang="scss">
.recharge {
    .record-text {
        color: $color-theme;
    }
    .icon-qq,
    .icon-wx {
        width: 35px;
        height: auto;
        object-fit: cover;
        margin: 0 10px;
    }
    .recharge-content {
        padding: 100px 30px 30px;
        .recharge-title {
            font-size: $font-size-32;
            margin: 25px 0;
            .title-icon {
                width: 5px;
                height: 26px;
                object-fit: cover;
            }
        }

        .recharge-type-list {
            @include flexStartCenterWrap();
            width: 100%;
            .recharge-type-cover {
                width: 33.33%;
                margin-bottom: 20px;
                .recharge-type-item {
                    width: 200px;
                    height: 80px;
                    margin: 0 auto;
                    @include flexCenter();
                    border: 1px solid $color-text-gray;
                    border-radius: 8px;
                    .gold {
                        margin-right: 5px;
                        color: $color-theme;
                    }
                    &.active {
                        background-color: $color-background-gloden;
                        border-color: $color-background-gloden;
                    }
                }
            }
        }
        .recharge-amount-list {
            .recharge-amount {
                @include flexStartCenterWrap();
                &-cover {
                    width: 33.33%;
                    margin-bottom: 20px;
                    .recharge-amount-item {
                        width: 200px;
                        height: 80px;
                        margin: 0 auto;
                        @include flexCenter();
                        border: 1px solid $color-text-gray;
                        border-radius: 8px;
                        font-weight: bold;
                        font-size: $font-size-28;
                        &.active {
                            background-color: $color-background-gloden;
                            border-color: $color-background-gloden;
                        }
                    }
                }
            }
        }
    }
    .chat-list {
        &-cover {
            width: 100%;
            @include flexColumnStartCenter();
            .chat-list-item {
                width: 100%;
                @include flexBetweenCenter();
                margin: 20px 0;
                .chat-type {
                    @include flexCenter();
                    font-size: $font-size-28;
                    &-wx,
                    &-qq {
                        background-color: $color-background-buy2;
                        @include flexCenter();
                        padding: 10px;
                        border-radius: 10px;
                    }
                    &-qq {
                        margin-left: 30px;
                    }
                }
                .chat-name {
                    font-size: $font-size-28;
                }
            }
        }
    }
    .recharge-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        .recharge-btn {
            width: 100%;
            height: 120px;
            background-color: $color-background-buy2;
            z-index: 9;
            @include flexColumnCenter();
            .buy-btn {
                width: 80%;
                height: 80px;
            }
        }
        .recharge-chat {
            @include flexColumnCenter();
            font-size: $font-size-28;
            width: 100%;
            margin-bottom: 15px;
            &-qq {
                height: 40px;
                line-height: 40px;
                max-width: 80%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                img {
                    vertical-align: middle;
                }
            }
        }
    }
}
</style>
