<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 18:50:52
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 15:06:59
 * @Description: 登录页面
-->
<template>
    <div class="login">
        <div class="snow-container">
            <div class="snow foreground"></div>
            <div class="snow foreground layered"></div>
            <div class="snow middleground"></div>
            <div class="snow middleground layered"></div>
            <div class="snow background"></div>
            <div class="snow background layered"></div>
        </div>

        <div class="login-form">
            <h2>登录系统</h2>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                @keyup.enter.native="submitForm(ruleFormRef)"
            >
                <el-form-item prop="account">
                    <el-input
                        v-model="ruleForm.account"
                        type="text"
                        autocomplete="off"
                        placeholder="账号"
                        class="input"
                    >
                        <template #prefix>
                            <el-icon size="26">
                                <user-filled />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input
                        v-model="ruleForm.password"
                        type="password"
                        autocomplete="off"
                        placeholder="密码"
                        class="input"
                    >
                        <template #prefix>
                            <el-icon size="26">
                                <lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <div class="cell">
                    <el-button
                        type="primary"
                        size="large"
                        @click="submitForm(ruleFormRef)"
                        :loading="httpStatus"
                    >{{ httpStatus ? '登录中...' : '登录' }}</el-button>
                </div>
                <div class="cell">
                    <el-button size="large" @click="resetForm(ruleFormRef)">重置</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { ElForm } from 'element-plus';
import { Lock, UserFilled } from '@element-plus/icons-vue';
import { useStore } from '@/store';
import { USER_ACTIONS } from '@/store/modules/user/action-types';
import { CONFIG_MUTATIONS } from '@/store/modules/config/mutation-types';

const store = useStore();
const router = useRouter();

type FormInstance = InstanceType<typeof ElForm>;
const ruleFormRef = ref<FormInstance>();
const httpStatus = ref<boolean>(false);

const ruleForm = reactive({
    account: '',
    password: '',
})

const accountValide = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        if (value.length < 5) {
            callback(new Error('账号长度大于5'))
        }
        callback()
    }
}
const passwordValide = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (value.length < 5) {
            callback(new Error('密码长度大于5'))
        }
        callback()
    }
}

const rules = reactive({
    account: [{ validator: accountValide, trigger: 'blur' }],
    password: [{ validator: passwordValide, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            httpStatus.value = true;
            store.commit(CONFIG_MUTATIONS.SET_TOKEN_MUTATION, 'asdwqewqedasd51d1as56d1');
            store.dispatch(USER_ACTIONS.SET_USER_ACTION, { name: ruleForm.account });
            
            setTimeout(() => {
                httpStatus.value = false;
                ElMessage.success('登录成功！');
                router.push('/home');
            }, 1500);
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("@/assets/images/bg.jpg");
    &-form {
        width: 320px;
        padding: 30px;
        border-radius: 2px;
        border-radius: 6px;
        box-shadow: 0px 0px 1px 0px gray;
        background: rgba(41, 39, 39, 0.46);
        position: absolute;
        top: 48%;
        left: 50%;
        transform: translate(-50%, -50%);
        h2 {
            color: #fff;
            font-size: $font-size-12;
            font-weight: 500;
            text-align: center;
            letter-spacing: 2px;
            margin-bottom: 20px;
        }
        .cell {
            margin-top: 50px;
            button {
                width: 100%;
                letter-spacing: 2px;
            }
            &:last-child {
                margin-top: 14px;
            }
        }
        :deep(.el-form-item) {
            margin-bottom: 30px;
        }

        :deep(.el-form-item__error) {
            padding-left: 50px;
            box-sizing: border-box;
        }
        :deep(.el-input),
        :deep(.el-input__inner) {
            display: block;
        }
        :deep(.el-input__inner) {
            border: none;
            color: #fff;
            height: 46px;
            padding-left: 50px;
            border-radius: 0;
            background-color: transparent;
            border-bottom: 1px solid #889ba0;
            &:focus {
                border-color: #409eff;
            }
        }
        :deep(.el-input__prefix-inner) {
            display: flex;
            align-items: center;
            padding-bottom: 2px;
        }
        :deep(.is-error .el-input__inner) {
            border-color: #f56c6c;
        }
    }
}
</style>