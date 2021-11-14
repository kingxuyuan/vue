<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="forget-password">
        <v-header left-arrow title="忘记密码" />
        <div class="forget-password-content">
            <van-form @submit="onSubmit">
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
                            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
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
                        <span class="send-msg" @click="forgetSendCode">{{
                            statusText
                        }}</span>
                    </template>
                </van-field>
                <van-field
                    v-model="new_password"
                    type="password"
                    name="new_password"
                    label="密码"
                    placeholder="请输入6-12位字母或数字新密码"
                    maxlength="12"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                    v-model="secondPassword"
                    type="password"
                    name="secondPassword"
                    label="确认密码"
                    placeholder="确认密码"
                    maxlength="12"
                    :rules="[{ required: true, message: '请填写确认密码' }]"
                />

                <div class="forget-password-submit">
                    <van-button round block type="primary" native-type="submit"
                        >确定</van-button
                    >
                </div>
            </van-form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onUnmounted } from 'vue';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { frogetPawFromType } from '@/types/api/login';
import { forgetPassword } from '@/api/login';
import { sendCode } from '@/api/login';

export default defineComponent({
    setup() {
        const router = useRouter();
        const passwordParams = reactive({
            mobile: '',
            verify_code: '',
            new_password: '',
            secondPassword: '',
        }) as frogetPawFromType;

        const smsInfo = reactive({
            statusText: '发送验证码',
            isSend: false,
            second: 60,
            time: null as any,
        });

        // 发送验证码
        const forgetSendCode = async () => {
            if (!passwordParams.mobile) {
                Toast('手机号不能为空');
                return;
            }

            if (!smsInfo.isSend) {
                const result: any = await sendCode({
                    global_area_code: 86,
                    mobile: passwordParams.mobile,
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

        //清除表单
        const clearFrom = () => {
            passwordParams.mobile = '';
            passwordParams.verify_code = '';
            passwordParams.new_password = '';
            passwordParams.secondPassword = '';
        };

        const onSubmit = async (values: frogetPawFromType) => {
            const result: any = await forgetPassword(values);

            if (result.code === 0) {
                Toast.success(result.msg);
                setTimeout(() => {
                    router.back();
                    clearFrom();
                }, 1500);
            }
        };
        onUnmounted(() => {
            smsInfo.time && clearInterval(smsInfo.time);
        });
        return {
            onSubmit,
            ...toRefs(passwordParams),
            ...toRefs(smsInfo),
            forgetSendCode,
        };
    },
});
</script>

<style scoped lang="scss">
.forget-password {
    .forget-password-content {
        padding: 30px 40px;
        .send-msg {
            color: $color-theme;
        }
        .forget-password-submit {
            margin-top: 80px;
        }
    }
}
</style>
