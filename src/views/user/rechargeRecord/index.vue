<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="recharge-record">
        <v-header left-arrow title="交易记录" />
        <van-tabs
            v-model:active="active"
            sticky
            @click-tab="recordTab"
            color="#f99c10"
        >
            <van-tab title="充值记录" :name="1">
                <recharge-list :recordType="active" v-if="active === 1" />
            </van-tab>
            <van-tab title="消费记录" :name="3">
                <recharge-list :recordType="active" v-if="active === 3" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import rechargeList from './recordRechargeList.vue';

export default defineComponent({
    components: {
        rechargeList,
    },
    setup() {
        const active = ref(1);

        const recordTab = (val: any) => {
            active.value = val.name;
        };

        return { active, recordTab };
    },
});
</script>

<style scoped lang="scss">
.recharge-record {
}
</style>
