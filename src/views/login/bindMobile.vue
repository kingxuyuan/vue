<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="bind-mobile">
        <v-header left-arrow title="绑定手机号">
            <template #right>
                <span class="jump-text" @click="$router.push('/user')"
                    >跳过</span
                >
            </template>
        </v-header>
        <div class="bind-mobile-content">
            <div class="bind-phone-number">
                <van-form @submit="bindMobile">
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
                            <span class="send-msg" @click="bindSendCode">{{
                                statusText
                            }}</span>
                        </template>
                    </van-field>

                    <div class="bind-submit">
                        <van-button
                            round
                            block
                            type="primary"
                            native-type="submit"
                            >确定</van-button
                        >
                    </div>
                </van-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onUnmounted } from 'vue';
import { BindMobileParamsType } from '@/types/api/login';
import { Toast } from 'vant';
import { sendCode, bindMobileNumber } from '@/api/login';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const router = useRouter();

        const smsInfo = reactive({
            statusText: '发送验证码',
            isSend: false,
            second: 60,
            time: null as any,
        });
        const mobileloginParams = reactive({
            mobile: '',
            verify_code: '',
        }) as BindMobileParamsType;

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
        // 发送验证码
        const bindSendCode = async () => {
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

        const bindMobile = async () => {
            const result: any = await bindMobileNumber(mobileloginParams);
            if (result.code === 0) {
                Toast.success(result.msg);
                router.replace('/');
            }
        };

        onUnmounted(() => {
            smsInfo.time && clearInterval(smsInfo.time);
        });
        return {
            bindSendCode,
            ...toRefs(mobileloginParams),
            ...toRefs(smsInfo),
            bindMobile,
        };
    },
});
</script>

<style scoped lang="scss">
.bind-mobile {
    .jump-text {
        color: $color-theme;
    }
    &-content {
        padding: 30px 40px;
        .send-msg {
            color: $color-theme;
        }
        .bind-submit {
            margin-top: 60px;
        }
    }
}
</style>
