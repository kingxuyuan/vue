<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="user-center">
        <div class="user-content">
            <div class="user-info">
                <van-skeleton
                    avatar
                    :row="2"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                    avatar-size="64px"
                >
                    <div class="user-avatar">
                        <v-image
                            v-if="!isLogin"
                            src=""
                            :defaultSrc="avatar"
                            alt=""
                            @click="$router.push('/login')"
                        />
                        <div v-else class="login-avatar">
                            <v-image
                                :src="userInfoState.avatar"
                                alt=""
                                @click="$router.push('/personInfo')"
                            />
                            <div
                                class="vip"
                                v-show="userInfoState.is_vip === 1"
                            >
                                <img
                                    src="@/assets/images/user/icon_mine_name_vip.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div class="user-login-status">
                        <div class="login-before">
                            <span
                                v-if="!isLogin"
                                @click="$router.push('/login')"
                            >
                                登录/注册
                            </span>
                            <span v-else> {{ userInfoState.nick_name }} </span>
                        </div>
                        <div class="login-before-des" v-if="!isLogin">
                            看官大人欢迎您~
                        </div>
                    </div>
                </van-skeleton>
            </div>

            <div class="user-buy">
                <van-skeleton
                    :row="1"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                >
                    <div class="user-vip-text">
                        <i class="user-vip-icon"></i>
                        <span v-if="!isLogin">开通vip会员 畅享无限次观影</span>
                        <span v-else>{{
                            userInfoState.is_vip === 1
                                ? `会员至:${userInfoState.expire_time}到期`
                                : '开通vip会员 畅享无限次观影'
                        }}</span>
                    </div>

                    <div class="user-buy-vip" @click="$router.push('/member')">
                        {{
                            userInfoState.is_vip === 1 ? '立即续费' : '立即开通'
                        }}
                    </div>
                </van-skeleton>
            </div>
        </div>
        <div class="user-block">
            <van-cell-group>
                <van-skeleton
                    :row="3"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                >
                    <van-cell
                        title="会员"
                        :label="
                            !isLogin
                                ? '开通vip会员 畅享无限次观影'
                                : userInfoState.is_vip === 1
                                ? userInfoState.expire_time
                                : '开通vip会员 畅享无限次观影'
                        "
                    >
                        <template #right-icon>
                            <van-button
                                color="#FFB01B"
                                size="small"
                                @click="$router.push('/member')"
                                >购买</van-button
                            >
                        </template>
                    </van-cell>
                </van-skeleton>
                <van-skeleton
                    :row="3"
                    :loading="
                        isLogin && Object.keys(userAmountState).length === 0
                    "
                >
                    <van-cell
                        title="钱包"
                        :label="
                            '¥' + (!isLogin ? '0.00' : userAmountState.amount)
                        "
                    >
                        <template #right-icon>
                            <van-button
                                color="#FFB01B"
                                size="small"
                                @click="$router.push('/wallet')"
                                >充值</van-button
                            >
                        </template>
                    </van-cell>
                </van-skeleton>
                <van-cell title="邀请好友" is-link to="/shareApp" />
            </van-cell-group>
        </div>
        <router-link
            :to="`/iframe?src=${customer.payqq.trim()}`"
            v-if="customer.payqq"
            class="user-cusromer"
        >
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onActivated } from 'vue';
import _ from 'lodash';
import { useStore } from '@/store';
import { userActionTypes } from '@/store/modules/user/action-types';
import avatar from '@/assets/images/user/user_avatar.png';
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
        const isLogin = computed(() => store.getters.getterIsLogin);
        const userInfoState = computed(() => store.getters.getterUserInfo);
        const userAmountState = computed(() => store.getters.getterUserAmount);
        const customer = computed(() => store.getters.getterConfig);

        onActivated(() => {
            if (isLogin.value) {
                store.dispatch(userActionTypes.GET_USREINFO);
                store.dispatch(userActionTypes.GET_USREAMOUNT);
            }
        });

        return {
            isLogin,
            userInfoState,
            userAmountState,
            avatar,
            customer,
        };
    },
});
</script>

<style scoped lang="scss">
.user-center {
    background-color: $color-global-background;
    .user-content {
        width: 100%;
        @include bgurl('@/assets/images/user/user_bg.png');
        height: 420px;
        .van-skeleton {
            width: 100%;
        }
        .user-info {
            width: 100%;
            height: 296px;
            @include flexStartCenter();
            .user-avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                margin-left: 25px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
                .login-avatar {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    .vip {
                        position: absolute;
                        bottom: -10px;
                        width: 70px;
                        left: 50%;
                        transform: translateX(-50%);
                        img {
                            border-radius: 0;
                        }
                    }
                }
            }
            .user-login-status {
                margin-left: 20px;
                .login-before {
                    min-width: 160px;
                    height: 40px;
                    color: $color-text-white;
                    font-size: $font-size-28;
                    border: 1px solid $color-text-white;
                    @include flexCenter();
                    border-radius: 20px;
                    padding: 0 10px;
                }
                .login-before-des {
                    color: $color-text-white;
                    font-size: $font-size-24;
                    margin-top: 20px;
                }
            }
        }
        .user-buy {
            width: 100%;
            position: relative;
            @include bgurl('@/assets/images/user/user_buy_vip.png');
            height: 124px;
            @include flexBetweenCenter();
            .user-vip-text {
                @include flexCenter();
                .user-vip-icon {
                    width: 30px;
                    height: 30px;
                    margin: 0 10px 0 30px;
                    @include bgurl('@/assets/images/user/user_vip_icon.png');
                }
                span {
                    font-size: $font-size-24;
                    color: $color-text-price;
                }
            }
            .user-buy-vip {
                @include flexCenter();
                width: 180px;
                height: 50px;
                background-color: rgb(252, 219, 180);
                margin-right: 50px;
                border-radius: 60px;
                font-size: $font-size-24;
                color: $color-text-orange;
            }
        }
    }
    .user-block {
        margin-top: 20px;
    }
    .user-cusromer {
        width: 100px;
        height: 100px;
        position: fixed;
        right: 30px;
        bottom: 300px;
        @include bgurl('@/assets/images/user/icon_customer.png');
        display: block;
    }
}
</style>
