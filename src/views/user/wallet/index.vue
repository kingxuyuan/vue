<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="wallet">
        <v-header left-arrow title="钱包">
            <template #right>
                <span @click="$router.push('/rechargeRecord')">交易记录</span>
            </template>
        </v-header>
        <div class="wallet-content">
            <div class="wallet-content-cell">
                <van-skeleton
                    :row="3"
                    :loading="Object.keys(userAmountState).length === 0"
                >
                    <div class="wallet-title">
                        <span>总金额(元)</span
                        ><van-icon
                            name="replay"
                            class="iocn"
                            @click="getUserAmount"
                        />
                    </div>
                    <div class="wallet-amount">
                        <span class="rem">¥</span>
                        <p class="amount">{{ userAmountState.amount }}</p>
                    </div>
                </van-skeleton>
                <div class="wallet-btn">
                    <van-button
                        type="primary"
                        block
                        @click="$router.push('/recharge')"
                        >充值</van-button
                    >
                </div>
                <div class="wallet-tips">
                    <p class="wallet-tips-title">温馨提示</p>
                    <p class="wallet-tips-des">
                        钱包的余额可用于VIP、看片等消费，不支持提现
                    </p>
                </div>
            </div>
            <div class="wallet-swipe-box">
                <van-swipe
                    class="wallet-swipe"
                    :autoplay="3000"
                    indicator-color="#f99c10"
                >
                    <van-swipe-item
                        v-for="item in walletAdList.list"
                        :key="item.id"
                    >
                        <router-link :to="`/iframe?src=${item.url.trim()}`">
                            <v-image :src="item.pic"></v-image>
                        </router-link>
                        <p class="title">{{ item.title }}</p>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import _ from 'lodash';
import { useStore } from '@/store';
import { userActionTypes } from '@/store/modules/user/action-types';
import { checkRecharge } from '@/configs/checkRecharge';
export default defineComponent({
    beforeRouteEnter(to, from, next) {
        const rechargeDefer = _.debounce(() => {
            checkRecharge();
        }, 1500);
        rechargeDefer();
        next();
    },
    setup() {
        const store = useStore();
        const userAmountState = computed(() => store.getters.getterUserAmount);
        const walletAdList = computed(() => store.getters.getterWalletAd);
        const getUserAmount = () => {
            store.dispatch(userActionTypes.GET_USREAMOUNT);
        };

        const getWalletAdList = () => {
            store.dispatch(userActionTypes.GET_WALLETAD);
        };

        onMounted(() => {
            getUserAmount();
            getWalletAdList();
        });
        return {
            getUserAmount,
            userAmountState,
            walletAdList,
        };
    },
});
</script>

<style scoped lang="scss">
.wallet {
    .wallet-content {
        width: 100%;
        height: calc(100% - 93px);
        background: url('@/assets/images/user/user_bg.png');
        background-size: 100% 240px;
        background-repeat: no-repeat;
        background-position: top;
        background-color: $color-global-background;
        @include flexColumnStart();
        &-cell {
            width: 90%;
            height: 460px;
            background-color: $color-background-white;
            margin-top: 100px;
            border-radius: 20px;
            @include flexColumnCenter();
            .van-skeleton {
                width: 80%;
                margin: 15px 0;
            }
            .wallet-title {
                font-size: $font-size-26;
                width: 160px;
                @include flexBetweenCenter();
                .iocn {
                    font-size: $font-size-32;
                }
            }
            .wallet-amount {
                margin: 40px 0;
                @include flexCenter();
                .rem {
                    font-size: $font-size-32;
                    font-weight: bold;
                }
                .amount {
                    font-size: $font-size-60;
                    font-weight: bold;
                    margin-left: 8px;
                }
            }
            .wallet-btn {
                width: 85%;
            }
            .wallet-tips {
                margin-top: 55px;
                width: 85%;
                &-title {
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                &-des {
                    color: $color-text-102;
                }
            }
        }
        .wallet-swipe-box {
            width: 90%;
            height: 280px;
            margin-top: 70px;

            .wallet-swipe {
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 10px;
                }
                a {
                    width: 100%;
                    height: 180px;
                    display: block;
                }
                .title {
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: $color-text-black;
                    position: relative;
                    bottom: 0px;
                }
            }
        }
    }
}
</style>
