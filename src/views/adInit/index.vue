<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <teleport to="body">
        <LoadingInit v-if="!showStart && storeStart"></LoadingInit>
        <Init v-if="!showInit && storeInit"></Init>
        <Overlay v-if="storeAd"></Overlay>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import LoadingInit from './loadingInit.vue';
import Init from './Init.vue';
import Overlay from './Overlay.vue';
import { useStore } from '@/store';
import { Cache } from '@/utils/localStorage';

export default defineComponent({
    components: {
        LoadingInit,
        Init,
        Overlay,
    },
    emits: ['loadData'],
    setup(props, { emit }) {
        const store = useStore();
        const tabsList = computed(
            () => store.state.config?.config?.data?.categoryV2?.list,
        );
        const showStart = !!Cache.localGet('showStart') || false;
        const storeStart = computed(() => store.getters.getterShowStart);
        const showInit = !!Cache.localGet('showInit') || false;
        const storeInit = computed(() => store.getters.getterShowInit);
        const storeAd = computed(() => store.getters.getterShowAd);

        watch(
            () => tabsList.value,
            (val) => {
                if (val.length > 0 && !showStart) {
                    //提前加载首页数据
                    emit('loadData', val);
                }
            },
        );
        return {
            showStart,
            storeStart,
            showInit,
            storeInit,
            storeAd,
        };
    },
});
</script>

<style scoped></style>
