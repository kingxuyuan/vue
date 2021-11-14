<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="person-info">
        <v-header left-arrow title="个人资料" />
        <div class="person-info-content">
            <van-cell title="头像">
                <template #right-icon>
                    <div class="user-avatar">
                        <v-image :src="userInfoState.avatar" />
                    </div>
                </template>
            </van-cell>
            <van-cell title="昵称">
                <template #right-icon>
                    <div
                        @click="showDialog(userInfoState.is_vip)"
                        :class="[userInfoState.is_vip !== 1 ? 'disable' : '']"
                    >
                        {{ userInfoState.nick_name }}
                    </div>
                </template>
            </van-cell>
            <van-cell title="用户名" :value="userInfoState.account" />
            <van-cell title="ID" :value="userInfoState.id" />
            <van-cell title="手机号">
                <template #right-icon>
                    <div @click="goBind(userInfoState.mobile)">
                        {{
                            userInfoState.mobile
                                ? userInfoState.mobile
                                : '可用手机号登录或找回密码'
                        }}
                        <van-icon name="arrow" v-if="!userInfoState.mobile" />
                    </div>
                </template>
            </van-cell>
        </div>
        <div class="change-nickname">
            <van-dialog
                v-model:show="show"
                title="修改昵称"
                :show-cancel-button="false"
                :show-confirm-button="false"
                closeOnClickOverlay
            >
                <van-form @submit="meUpdateNickName">
                    <van-field
                        v-model="nick_name"
                        name="nick_name"
                        placeholder="请输入昵称"
                        maxlength="12"
                        :rules="[{ required: true, message: '请输入昵称' }]"
                    />
                    <div class="submit-btn">
                        <van-button
                            round
                            block
                            type="primary"
                            native-type="submit"
                        >
                            提交
                        </van-button>
                    </div>
                </van-form>
            </van-dialog>
        </div>
        <div class="logout-btn">
            <van-button type="primary" round block @click="userLogout()"
                >退出登录</van-button
            >
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
    onDeactivated,
} from 'vue';
import { useStore } from '@/store';
import { userActionTypes } from '@/store/modules/user/action-types';
import { loginActionTypes } from '@/store/modules/login/action-types';
import { configMutationTypes } from '@/store/modules/config/mutation-types';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { updateNickName } from '@/api/user';
import { updateNickNameType } from '@/types/api/user';
import { sessionCache } from '@/utils/sessionStorage';
import { getInitUserInfo } from '@/api/global';
import { Cache } from '@/utils/localStorage';

export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        const show = ref(false);
        const userInfoState = computed(() => store.getters.getterUserInfo);
        const getUserinfo = () => {
            store.dispatch(userActionTypes.GET_USREINFO);
        };

        const userLogout = () => {
            store.dispatch(loginActionTypes.DEL_TOKEN, logoutSuccess);
        };
        const updateNickNameParam = reactive({
            nick_name: '',
            time: null as any,
        });

        const logoutSuccess = () => {
            store.dispatch(userActionTypes.GET_CLEARUSERINFO);
            store.commit(
                configMutationTypes.SET_SHOWAD,
                sessionCache.sessionGet('showAd') ? false : true,
            );

            getInitUserInfo().then((res: any) => {
                if (res.code === 0) {
                    Cache.localSet('touristToken', res.data.token || '');
                    Cache.localSet('touristUserid', res.data.user_id || '');
                    Toast.success('退出成功');
                    router.push('/');
                }
            });
        };
        const showDialog = (vip: number) => {
            if (vip === 1) {
                show.value = true;
            }
        };

        const restStatus = () => {
            updateNickNameParam.time = setTimeout(() => {
                show.value = false;
                updateNickNameParam.nick_name = '';
            }, 1000);
        };
        const meUpdateNickName = async (value: updateNickNameType) => {
            const result: any = await updateNickName(value);
            if (result.code === 0) {
                Toast(result.msg);
                getUserinfo();
                restStatus();
            } else {
                restStatus();
            }
        };

        const goBind = (val: string) => {
            if (!val) {
                router.push('/bindMobile');
            }
        };

        onDeactivated(() => {
            updateNickNameParam.time && clearTimeout(updateNickNameParam.time);
        });
        onMounted(() => {
            getUserinfo();
        });

        return {
            userInfoState,
            userLogout,
            showDialog,
            show,
            ...toRefs(updateNickNameParam),
            meUpdateNickName,
            goBind,
        };
    },
});
</script>

<style scoped lang="scss">
.person-info {
    background-color: $color-global-background;
    position: relative;
    .person-info-content {
        .user-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }
        .disable {
            color: $color-text-959595;
        }
    }
    .change-nickname {
        .submit-btn {
            margin: 40px;
        }
    }
    .logout-btn {
        position: absolute;
        bottom: 80px;
        width: 80%;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
