<!--
 * @Author: 大侠传授两招吧
 * @Date: 2021-11-14 23:43:27
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 02:17:31
 * @Description: 
-->
<template>
    <div class="home">
        
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue';
import { useStore } from '@/store';
import { CONFIG_ACTIONS } from '@/store/modules/config/actions-types';

export default defineComponent({
    name: 'Home',
    setup() {
        const store = useStore();
        const config = computed(() => store.getters.getterConfig);

        onMounted(() => {
            store.dispatch(CONFIG_ACTIONS.SET_CONFIG_ACTIONS);
        })
        
        watch(() => config.value, (val) => {
            console.log(val);
        })
    }
});
</script>
