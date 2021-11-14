<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="member">
        <div class="member-header">
            <v-header left-arrow title="会员" fixed />
            <div class="member-info">
                <van-skeleton
                    avatar
                    :row="3"
                    :loading="Object.keys(userInfo).length === 0"
                    avatar-size="64px"
                >
                    <div class="member-avatar">
                        <v-image :src="userInfo.avatar"></v-image>
                        <div class="vip" v-show="userInfo.is_vip === 1">
                            <img
                                src="@/assets/images/user/icon_mine_name_vip.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="member-buy-status">
                        <div class="nick-name">{{ userInfo.nick_name }}</div>
                        <div class="buy-status">
                            <span class="buy-status-des">{{
                                userInfo.is_vip === 1
                                    ? `会员至:${userInfo.expire_time}到期`
                                    : '当前暂未开通会员'
                            }}</span>
                        </div>
                    </div>
                </van-skeleton>
            </div>
        </div>
        <div class="member-content">
            <div class="member-combo-title">选择VIP会员套餐</div>
            <van-skeleton :row="4" :loading="!comboList.vip?.length">
                <div class="choose-content">
                    <div
                        :class="[
                            'choose-content-item-cover',
                            { active: currentIndex === index },
                        ]"
                        v-for="(item, index) in comboList.vip"
                        :key="item.cheap"
                        @click="changeCurrent(index, item)"
                    >
                        <div class="choose-content-item">
                            <div class="choose-content-item-top">
                                {{ item.vip_text }}
                            </div>
                            <div class="choose-content-item-bottom">
                                <div class="price">
                                    <span class="rmb">¥</span>
                                    <span class="amount">{{ item.price }}</span>
                                </div>
                                <div class="discount" v-if="item.cheap > 0">
                                    已优惠¥{{ item.cheap }}
                                </div>
                                <div class="no-discount" v-else></div>
                                <div class="price-per">
                                    ¥{{ item.month_price }}/月
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-skeleton>
            <div class="member-combo-title">VIP权益</div>
            <van-skeleton :row="7" :loading="!equityList?.length">
                <div class="combo-equity">
                    <div
                        class="combo-equity-cover"
                        v-for="item in equityList"
                        :key="item.id"
                    >
                        <div class="combo-equity-item">
                            <div class="combo-equity-item-left">
                                <v-image :src="item.cover"></v-image>
                            </div>
                            <div class="combo-equity-item-right">
                                <div class="equity-title">{{ item.title }}</div>
                                <p class="equity-des">{{ item.sub_title }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </van-skeleton>
        </div>

        <div class="member-bottom">
            <div class="member-bottom-cover">
                <div class="bottom-btn">
                    <div class="bottom-btn-left">
                        <div class="price">
                            <span>{{ info?.vip_text }}¥</span
                            ><span>{{ info?.price }}</span>
                        </div>
                    </div>
                    <div class="bottom-btn-right">
                        <div class="buy-btn" @click="userBuyVIP()">
                            {{
                                userInfo.is_vip === 1 ? '立即续费' : '立即开通'
                            }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    onMounted,
    ref,
    reactive,
    toRefs,
    watch,
} from 'vue';
import { useStore } from '@/store';
import { userActionTypes } from '@/store/modules/user/action-types';
import { ComboVipType } from '@/types/api/user';
import { getVipBuy } from '@/api/user';
import { Toast, Dialog } from 'vant';
import { useRouter } from 'vue-router';
Toast.allowMultiple();

export default defineComponent({
    setup() {
        const store = useStore();
        const userInfo = computed(() => store.getters.getterUserInfo);
        const router = useRouter();
        const currentIndex = ref(0);
        const buyType = ref(1); //购买套餐类型
        const currentInfo = reactive({
            info: {} as ComboVipType,
        });
        const changeCurrent = (index: number, item: ComboVipType) => {
            currentIndex.value = index;
            currentInfo.info = item;
            buyType.value = item.type;
        };

        const getUserInfo = () => {
            store.dispatch(userActionTypes.GET_USREINFO);
        };
        const getUserCombo = () => {
            store.dispatch(userActionTypes.GET_COMBO);
        };
        const equityList = computed(() => store.state.user.user.combo.info);
        const comboList = computed(() => store.getters.getterCombo);

        //购买VIP
        const userBuyVIP = () => {
            Dialog.confirm({
                title: '确认支付',
                message: `确认支付${currentInfo.info?.price}酷币？`,
                confirmButtonColor: '#f99c10',
            })
                .then(async () => {
                    const toast = Toast.loading({
                        message: '加载中...',
                        forbidClick: false,
                        duration: 0,
                    });
                    const result: any = await getVipBuy({
                        type: buyType.value,
                    });
                    toast.clear();
                    if (result.code !== 0) {
                        Dialog.alert({
                            title: '酷币余额不足',
                            theme: 'round-button',
                            confirmButtonText: '立即充值',
                            confirmButtonColor: '#f99c10',
                            width: '60%',
                            closeOnClickOverlay: true,
                        }).then(() => {
                            router.push('/recharge');
                        });
                    } else {
                        Dialog.alert({
                            title: 'VIP开通成功',
                            theme: 'round-button',
                            confirmButtonText: '我知道了',
                            confirmButtonColor: '#f99c10',
                            width: '60%',
                        }).then(() => {
                            getUserInfo();
                            getUserCombo();
                        });
                    }
                })
                .catch(() => {
                    // on cancel
                });
        };

        onMounted(() => {
            getUserInfo();
            getUserCombo();
        });

        watch(
            () => comboList.value,
            (list) => {
                if (list.vip.length > 0) {
                    changeCurrent(0, list.vip[0]);
                }
            },
        );
        return {
            userInfo,
            comboList,
            changeCurrent,
            currentIndex,
            equityList,
            ...toRefs(currentInfo),
            userBuyVIP,
        };
    },
});
</script>

<style scoped lang="scss">
.member {
    .member-header {
        width: 100%;
        height: 300px;
        padding-top: 60px;
        @include bgurl('@/assets/images/user/mine_bg_vip.png');
        background-position-y: -130px;

        .member-info {
            margin: 100px auto 0;
            width: 90%;
            height: 200px;
            @include bgurl('@/assets/images/user/myvip_bg.png');
            @include flexBetweenCenter();
            .van-skeleton {
                width: 100%;
            }
            .member-avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                margin-left: 25px;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
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
            .member-buy-status {
                flex: 1;
                @include flexColumnBetweenStart();
                margin-left: 15px;
                .nick-name {
                    color: $color-text-price;
                    font-size: $font-size-24;
                }
                .buy-status {
                    margin-top: 20px;
                    @include flexBetweenCenter();
                    width: 100%;
                    .buy-status-des {
                        color: $color-text-price;
                        font-size: $font-size-20;
                    }
                }
            }
        }
    }
    .member-content {
        margin-top: 30px;
        padding: 0 30px 120px;
        .member-combo-title {
            font-size: $font-size-24;
            font-weight: 800;
            color: $color-text-51;
        }
        .choose-content {
            width: 100%;
            margin: 30px 0 50px 0;
            @include flexStartCenterWrap();
            .choose-content-item-cover {
                width: 33.33%;
                margin-bottom: 20px;
                &.active {
                    border-color: $color-background-gloden;
                    .choose-content-item-top {
                        background-color: $color-background-gloden;
                        border-color: $color-background-gloden;
                    }
                    .choose-content-item {
                        border-color: $color-background-gloden;
                    }
                }
                .choose-content-item {
                    width: 180px;
                    height: 220px;
                    border: 4px solid rgb(184, 184, 184);
                    border-radius: 10px;
                    @include flexColumnCenter();
                    margin: 0 auto;
                    box-shadow: 5px 5px 10px $color-highlight-background;
                    &:last-child {
                        margin-right: auto;
                    }
                    &-top {
                        width: 100%;
                        @include flexCenter();
                        height: 40px;
                        border-bottom: 4px solid rgb(184, 184, 184);
                        font-size: $font-size-24;
                        color: $color-text-333;
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                    }
                    &-bottom {
                        width: 100%;
                        flex: 1;
                        @include flexColumnCenter();
                        .price {
                            color: $color-text-black;
                            .rmb {
                                font-size: $font-size-24;
                            }
                            .amount {
                                font-size: $font-size-48;
                                font-weight: bold;
                            }
                            flex: 1;
                            @include flexCenter();
                            align-items: flex-end;
                        }
                        .discount {
                            background-color: $color-background-gloden;
                            font-size: $font-size-20;
                            margin: 10px 0;
                            padding: 4px 8px;
                            border-radius: 15px;
                            color: $color-text-orange;
                            height: 28px;
                            line-height: 28px;
                        }
                        .no-discount {
                            width: 100%;
                            height: 28px;
                            margin: 10px 0;
                            padding: 4px 8px;
                        }
                        .price-per {
                            font-size: $font-size-24;
                            color: $color-text-102;
                            margin-bottom: 15px;
                        }
                    }
                }
            }
        }
        .combo-equity {
            width: 100%;
            margin: 30px 0 20px;
            @include flexBetweenCenterWrap();
            &-cover {
                width: 45%;
                .combo-equity-item {
                    background-color: $color-background-gray;
                    border-radius: 10px;
                    padding: 20px;
                    @include flexBetweenStart();
                    margin-bottom: 25px;
                    &-left {
                        width: 120px;
                        height: 120px;
                        border-radius: 10px;
                        margin-bottom: 30px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 10px;
                            object-fit: cover;
                        }
                    }
                    &-right {
                        flex: 1;
                        margin-left: 15px;
                        .equity-title {
                            color: $color-text-333;
                            font-size: $font-size-28;
                            margin-bottom: 20px;
                        }
                        .equity-des {
                            font-size: $font-size-20;
                            color: $color-text-102;
                        }
                    }
                }
            }
        }
    }
    .member-bottom {
        width: 100%;
        height: 120px;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: $color-background-white;
        z-index: 9;
        &-cover {
            width: 100%;
            height: 100%;
            @include flexColumnCenter();
        }
        .bottom-btn {
            width: 80%;
            height: 80px;
            @include flexBetweenCenter();
            &-left {
                width: 70%;
                height: 100%;
                line-height: 80px;
                background-color: $color-background-buy;
                padding-left: 30px;
                border-top-left-radius: 40px;
                border-bottom-left-radius: 40px;
                .price {
                    color: $color-text-price;
                    span:nth-child(2) {
                        font-size: $font-size-48;
                    }
                }
            }
            &-right {
                flex: 1;
                height: 100%;
                line-height: 80px;
                text-align: center;
                border-top-right-radius: 40px;
                border-bottom-right-radius: 40px;
                background-color: $color-background-gloden;
                .buy-btn {
                    width: 100%;
                    font-size: $font-size-28;
                    color: $color-text-orange;
                }
            }
        }
    }
}
</style>
