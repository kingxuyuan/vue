<template>
    <router-view
        :class="isShowFooter ? 'has-nav' : 'no-nav'"
        v-slot="{ Component }"
        v-if="hasHeaderParams"
    >
        <!-- <transition appear :name="transitionName"> -->
        <keep-alive>
            <component :is="Component" />
        </keep-alive>
        <!-- </transition> -->
    </router-view>
    <km-footer v-if="isShowFooter" />
</template>
<script lang="ts">
import { defineComponent, onMounted, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import kmFooter from '@/components/footer/index.vue';

import { getInitUserInfo } from '@/api/global';
import { Cache } from '@/utils/localStorage';
import { useStore } from '@/store';
import { configActionTypes } from '@/store/modules/config/action-types';
import { activeActionTypes } from '@/store/modules/active/action-types';

export default defineComponent({
    components: {
        kmFooter,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const transition = ['slide-left', 'slide-right'];
        let transitionName = ref(transition[0]);
        const isShowFooter = ref(route.meta.footShow);
        const hasHeaderParams = ref(false); //保证页面请求携带参数

        watch(
            () => route.path,
            (newVal) => {
                // 设置底部样式
                if (newVal) {
                    isShowFooter.value = route.meta.footShow;
                }
                //检查是否重启
                const isStart = !!Cache.localGet('showStart');
                if (!isStart && route.path !== '/home') {
                    router.replace('/');
                }
            },
            {
                immediate: true,
            },
        );

        //路由切换动画
        watch(
            () => route.meta.animationIndex,
            (newIndex: any, oldIndex: any) => {
                if (!newIndex) {
                    transitionName.value = 'fade';
                } else {
                    if (newIndex > oldIndex) {
                        transitionName.value = transition[0];
                    } else {
                        transitionName.value = transition[1];
                    }
                }
            },
        );

        // 获取用户初始化信息
        const getInitUser = async () => {
            if (
                !Cache.localGet('touristToken') ||
                !Cache.localGet('touristUserid')
            ) {
                const res: any = await getInitUserInfo();
                Cache.localSet('touristToken', res.data.token || '');
                Cache.localSet('touristUserid', res.data.user_id || '');
            }
            hasHeaderParams.value = true;
        };

        //获取配置
        const getConfigAjax = () => {
            store.dispatch(configActionTypes.GET_CONFIG);
        };

        //获取活动数据
        const getActiveAjax = () => {
            store.dispatch(activeActionTypes.GET_ACTIVEDATA);
        };

        onMounted(async () => {
            await getInitUser();
            if (
                Cache.localGet('touristToken') ||
                Cache.localGet('touristUserid')
            ) {
                await getConfigAjax();
                await getActiveAjax();
            } else {
                hasHeaderParams.value = false;
            }
        });
        return {
            isShowFooter,
            transitionName,
            hasHeaderParams,
        };
    },
});
</script>

<style lang="scss">
.has-nav {
    @include contentRestFull();
}
.no-nav {
    width: 100%;
    height: 100%;
}
</style>
