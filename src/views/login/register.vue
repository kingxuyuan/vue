<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="register">
        <v-header left-arrow :border="false" />
        <div class="register-content">
            <div class="register-title">
                <p>用户注册</p>
            </div>
            <div class="register-from">
                <div class="register-account">
                    <van-form @submit="onSubmitRegister">
                        <van-field
                            v-model="account"
                            name="account"
                            label="用户名"
                            placeholder="请输入用户名4-9位字母或数字"
                            maxlength="9"
                            :rules="[
                                { required: true, message: '请填写用户名' },
                            ]"
                        />
                        <van-field
                            v-model="password"
                            type="password"
                            name="password"
                            label="密码"
                            placeholder="请输入密码(6-12位字母或数字)"
                            maxlength="12"
                            :rules="[{ required: true, message: '请填写密码' }]"
                        />
                        <van-field
                            v-model="promo_code"
                            name="promo_code"
                            label="推广码"
                            placeholder="选填(增加观影次数)"
                            maxlength="12"
                        />

                        <div class="register-submit">
                            <van-button
                                round
                                block
                                type="primary"
                                native-type="submit"
                                >注册</van-button
                            >
                        </div>
                    </van-form>
                </div>
            </div>
        </div>
        <div class="register-protocol">
            <p>
                登录注册即表示同意&nbsp;<span
                    @click="$router.push('/userAgreement')"
                    >《用户注册协议》</span
                >&nbsp;<span @click="$router.push('/userAgreement')"
                    >《隐私条款》</span
                >
            </p>
        </div>
        <div class="semi-circle"></div>
        <div class="sector"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useStore } from '@/store';
import { loginActionTypes } from '@/store/modules/login/action-types';
import { useRouter } from 'vue-router';
import { Dialog } from 'vant';
import { RegisterParamsType, RegisterSuccessType } from '@/types/api/login';

export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();

        const registerParams = reactive({
            account: '',
            password: '',
            promo_code: '',
        }) as RegisterParamsType;

        //账号密码注册
        const onSubmitRegister = (values: RegisterParamsType) => {
            store.dispatch(loginActionTypes.SET_REGISTER, {
                ...values,
                registerSuccess,
            });
        };

        const registerSuccess = (res: any) => {
            if (res.new_vip === 1) {
                Dialog.alert({
                    title: '恭喜您获得一日VIP',
                    theme: 'round-button',
                    confirmButtonText: '确定',
                    confirmButtonColor: '#f99c10',
                    width: '60%',
                }).then(() => {
                    if (res.reg_sms == 1) {
                        router.push('/bindMobile');
                    } else {
                        router.replace('/');
                    }
                });
            } else if (res.reg_sms == 1) {
                router.push('/bindMobile');
            } else {
                router.replace('/');
            }
        };

        return {
            ...toRefs(registerParams),
            onSubmitRegister,
        };
    },
});
</script>

<style scoped lang="scss">
.register {
    position: relative;
    overflow: hidden;
    .register-content {
        padding: 30px 40px;
        .register-title {
            p {
                color: $color-text-51;
                font-size: $font-size-48;
                font-weight: 500;
                margin-bottom: 15px;
            }
        }
        .register-from {
            margin-top: 140px;

            .register-submit {
                margin-top: 80px;
            }
        }
    }
    .register-protocol {
        position: absolute;
        bottom: 40px;
        width: 100%;
        left: 0;
        text-align: center;
        font-size: $font-size-24;
        color: $color-text-102;
        span {
            color: $color-theme;
        }
    }
    .semi-circle {
        border-radius: 200px 200px 0 0;
        height: 110px;
        width: 200px;
        position: absolute;
        left: -100px;
        top: 250px;
        background: linear-gradient(
            $color-background-details1,
            $color-background-details2
        );
        transform: rotate(90deg);
    }

    .sector {
        height: 200px;
        width: 200px;
        border-radius: 400px 0 0;
        position: absolute;
        top: -10px;
        right: -10px;
        background: linear-gradient(
            $color-background-details1,
            $color-background-details2
        );
        z-index: 2;
        transform: rotate(270deg);
    }
}
</style>
