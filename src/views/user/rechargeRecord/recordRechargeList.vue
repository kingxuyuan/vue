<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="record-recharge">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div class="record-recharge-list">
                    <div
                        class="record-recharge-list-item"
                        v-for="(item, index) in recordRechargeList?.data?.list"
                        :key="item.addtime + index"
                    >
                        <div class="record-item-left">
                            <img
                                src="@/assets/images/user/icon_pay_history.png"
                                alt=""
                            />
                        </div>
                        <div class="record-item-right">
                            <div class="item-right-type">
                                <span class="type-text">{{
                                    recordType === 1
                                        ? RechagerTypeStatus[item.type]
                                        : ConsumedTypeStatus[item.type]
                                }}</span>
                                <span class="amount">{{
                                    recordType === 1
                                        ? `+${item.amount}`
                                        : item.amount
                                }}</span>
                            </div>
                            <p class="item-right-status">
                                {{ RechagerStatus[item.status] }}
                            </p>
                            <p class="item-right-time">{{ item.addtime }}</p>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    ref,
    reactive,
    watch,
    onMounted,
} from 'vue';
import _ from 'lodash';
import { userActionTypes } from '@/store/modules/user/action-types';
import { useStore } from '@/store';
import { RecordParamsType } from '@/types/api/user';

export default defineComponent({
    props: {
        recordType: {
            type: Number,
            required: true,
            default: 1,
        },
    },
    setup(props) {
        const RechagerTypeStatus = {
            1: '平台充值',
            2: '代理充值',
            3: '平台赠送',
        };

        const ConsumedTypeStatus = {
            1: '购买VIP',
            2: '购买影片',
        };
        const RechagerStatus = {
            1: '等待',
            0: '成功',
        };
        const refreshing = ref(false); //下拉刷新

        const loading = computed(
            () => store.state.user.user.RechargeRecord.loading,
        );

        const finished = computed(
            () => store.state.user.user.RechargeRecord.noresult,
        );

        const store = useStore();

        const recordRechargeParams = reactive({
            page: 1,
            type: props.recordType,
            row: 20,
        }) as RecordParamsType;

        const getRecordRecharge = _.debounce(() => {
            store.dispatch(
                userActionTypes.GET_RECORDRECHARGE,
                recordRechargeParams,
            );
        }, 200);

        const nextRecord = () => {
            getRecordRecharge();
        };

        const onRefresh = () => {
            if (refreshing.value) {
                recordRechargeParams.page = 1;
                store.dispatch(userActionTypes.GET_NEWRECORDRECHARGE, onLoad);
                refreshing.value = false;
            }
        };

        const onLoad = () => {
            nextRecord();
        };

        const recordRechargeList = computed(
            () => store.getters.getterRecordRecharge,
        );

        watch(
            () => recordRechargeList.value?.data?.list,
            (val) => {
                if (val.length > 0) {
                    recordRechargeParams.page++;
                }
            },
        );
        const initRecord = () => {
            recordRechargeParams.page = 1;
            recordRechargeParams.type = props.recordType;
            store.dispatch(userActionTypes.GET_NEWRECORDRECHARGE, onLoad);
        };
        onMounted(() => {
            initRecord();
        });

        return {
            recordRechargeList,
            RechagerTypeStatus,
            ConsumedTypeStatus,
            RechagerStatus,
            refreshing,
            loading,
            finished,
            onRefresh,
            onLoad,
        };
    },
});
</script>

<style scoped lang="scss">
.record-recharge {
    padding: 20px;

    .record-recharge-list {
        width: 100%;
        @include flexColumnStart();
        &-item {
            width: 100%;
            @include flexBetweenStart();
            padding: 20px;
            .record-item-left {
                width: 80px;
                height: 80px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .record-item-right {
                flex: 1;
                margin-left: 20px;
                .item-right-type {
                    width: 100%;
                    @include flexBetweenCenter();
                    .type-text {
                        font-size: $font-size-28;
                        font-weight: bold;
                    }
                    .amount {
                        font-size: $font-size-28;
                    }
                }
                .item-right-status,
                .item-right-time {
                    font-size: $font-size-22;
                    color: $color-text-gray-d;
                }
                .item-right-status {
                    margin: 14px 0;
                }
            }
        }
    }
}
</style>
