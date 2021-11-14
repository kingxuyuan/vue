<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="login">
        <v-header left-arrow :border="false" />
        <div class="login-content">
            <div class="login-title">
                <p>Hi,</p>
                <p>登录后更精彩</p>
            </div>
            <div class="login-from">
                <transition appear name="slide-right">
                    <div class="login-account" v-if="isAccountLogin">
                        <van-form @submit="onSubmitAccount">
                            <van-field
                                v-model="account"
                                name="account"
                                label="用户名"
                                placeholder="请输入用户名或手机号"
                                maxlength="16"
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
                                :rules="[
                                    { required: true, message: '请填写密码' },
                                ]"
                            />
                            <div class="login-register-forget">
                                <span @click="$router.push('/forgetPassword')"
                                    >忘记密码?</span
                                >
                                <span @click="changeLoginType()"
                                    >手机验证码登录<van-icon name="arrow"
                                /></span>
                            </div>

                            <div class="login-submit">
                                <van-button
                                    round
                                    block
                                    type="primary"
                                    native-type="submit"
                                    >登录</van-button
                                >
                            </div>
                            <div
                                class="new-user-register"
                                @click="$router.push('/register')"
                            >
                                新用户注册<van-icon name="arrow" />
                            </div>
                        </van-form>
                    </div>
                </transition>
                <transition appear name="slide-left">
                    <div class="login-phone-number" v-if="!isAccountLogin">
                        <van-form @submit="onSubmitMobile">
                            <van-field
                                v-model="mobile"
                                name="mobile"
                                label="手机号"
                                placeholder="请输入手机号"
                                maxlength="11"
                                :rules="[
                                    {
                                        required: true,
                                        message: '请填写正确的手机号',
                                        pattern:
                                            /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
                                    },
                                ]"
                            />
                            <van-field
                                v-model="verify_code"
                                name="verify_code"
                                label="验证码"
                                placeholder="请输入短信验证码"
                                maxlength="8"
                                :rules="[
                                    {
                                        required: true,
                                        message: '请填写短信验证码',
                                    },
                                ]"
                            >
                                <template #button>
                                    <span
                                        class="send-msg"
                                        @click="loginSendCode"
                                        >{{ statusText }}</span
                                    >
                                </template>
                            </van-field>
                            <div class="login-register-forget">
                                <span @click="$router.push('/forgetPassword')"
                                    >忘记密码?</span
                                >
                                <span @click="changeLoginType()"
                                    >账号密码登录<van-icon name="arrow"
                                /></span>
                            </div>

                            <div class="login-submit">
                                <van-button
                                    round
                                    block
                                    type="primary"
                                    native-type="submit"
                                    >登录</van-button
                                >
                            </div>
                            <div
                                class="new-user-register"
                                @click="$router.push('/register')"
                            >
                                新用户注册<van-icon name="arrow" />
                            </div>
                        </van-form>
                    </div>
                </transition>
            </div>
        </div>
        <div class="login-protocol">
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
import {
    defineComponent,
    reactive,
    toRefs,
    ref,
    onUnmounted,
    onActivated,
} from 'vue';
import { useStore } from '@/store';
import { loginActionTypes } from '@/store/modules/login/action-types';
import { useRouter, useRoute } from 'vue-router';
import { Toast } from 'vant';
import { LoginAccountType, LoginMobileType } from '@/types/api/login';
import { sendCode } from '@/api/login';
import { userActionTypes } from '@/store/modules/user/action-types';
import { getInitUserInfo } from '@/api/global';
import { Cache } from '@/utils/localStorage';

export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const isAccountLogin = ref(true);
        const loginParams = reactive({
            account: '',
            password: '',
        }) as LoginAccountType;
        const mobileloginParams = reactive({
            mobile: '',
            verify_code: '',
        }) as LoginMobileType;

        const smsInfo = reactive({
            statusText: '发送验证码',
            isSend: false,
            second: 60,
            time: null as any,
        });

        //账号密码登录
        const onSubmitAccount = (values: LoginAccountType) => {
            store.dispatch(loginActionTypes.SET_TOKEN, {
                ...values,
                loginSuccess,
            });
        };

        //验证码登录
        const onSubmitMobile = (values: LoginMobileType) => {
            store.dispatch(loginActionTypes.SET_MOBILE_TOKEN, {
                ...values,
                loginSuccess,
            });
        };
        //获取用户信息
        const getUserinfo = () => {
            store.dispatch(userActionTypes.GET_USREINFO);
        };
        const loginSuccess = () => {
            Toast.success('登录成功');
            getUserinfo();
            let path = route.query?.redirect as string;
            if (path) {
                router.replace(path);
            } else {
                router.replace('/');
            }
        };

        const changeLoginType = () => {
            isAccountLogin.value = !isAccountLogin.value;
        };
        // 发送验证码
        const loginSendCode = async () => {
            if (!mobileloginParams.mobile) {
                Toast('手机号不能为空');
                return;
            }
            if (!smsInfo.isSend) {
                const result: any = await sendCode({
                    global_area_code: 86,
                    mobile: mobileloginParams.mobile,
                    operate: 1,
                });
                if (result.code === 0) {
                    Toast.success('验证码发送成功');
                    countTime();
                }
            }
        };

        // 短信验证码倒计时
        const countTime = () => {
            smsInfo.isSend = true;
            smsInfo.time = setInterval(() => {
                smsInfo.second--;
                smsInfo.statusText = `${smsInfo.second}s`;
                if (smsInfo.second === 0) {
                    smsInfo.isSend = false;
                    smsInfo.statusText = '发送验证码';
                    smsInfo.second = 60;
                    clearInterval(smsInfo.time);
                }
            }, 1000);
        };

        onActivated(async () => {
            //用户在其他设备登录，重新获取游客id
            if (
                !Cache.localGet('touristToken') ||
                !Cache.localGet('touristUserid')
            ) {
                const res: any = await getInitUserInfo();
                Cache.localSet('touristToken', res.data.token || '');
                Cache.localSet('touristUserid', res.data.user_id || '');
            }
        });

        onUnmounted(() => {
            smsInfo.time && clearInterval(smsInfo.time);
        });

        return {
            ...toRefs(loginParams),
            ...toRefs(mobileloginParams),
            onSubmitAccount,
            isAccountLogin,
            changeLoginType,
            loginSendCode,
            onSubmitMobile,
            ...toRefs(smsInfo),
        };
    },
});
</script>

<style scoped lang="scss">
.login {
    position: relative;
    overflow: hidden;
    .login-content {
        padding: 30px 40px;
        .login-title {
            p {
                color: $color-text-51;
                font-size: $font-size-48;
                font-weight: 500;
                margin-bottom: 15px;
            }
        }
        .login-from {
            margin-top: 70px;
            position: relative;
            min-height: 470px;
            .login-account,
            .login-phone-number {
                width: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }

            .login-register-forget {
                @include flexBetweenCenter();
                margin-top: 40px;
                padding-left: 30px;
                padding-right: 30px;
                height: 40px;
                span {
                    font-size: $font-size-24;
                    color: $color-text-102;
                    display: block;
                }
            }
            .send-msg {
                color: $color-theme;
            }
            .login-submit {
                margin-top: 80px;
            }
            .new-user-register {
                width: 100%;
                text-align: center;
                font-size: $font-size-28;
                margin-top: 40px;
            }
        }
    }
    .login-protocol {
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
