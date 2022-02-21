<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 18:50:52
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-21 11:49:13
 * @Description: 登录页面
-->
<template>
    <div class="login">
        <div class="login-form">
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
                    >
                        <template #prefix>
                            <el-icon>
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
                    >
                        <template #prefix>
                            <el-icon>
                                <lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <div class="cell">
                    <el-button type="primary" size="large" @click="submitForm(ruleFormRef)" :loading="httpStatus">提交</el-button>
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
            ElMessage.success('登录成功！');
            store.commit(CONFIG_MUTATIONS.SET_TOKEN_MUTATION, 'asdwqewqedasd51d1as56d1');
            setTimeout(() => {
                httpStatus.value = false;
                router.push('/home');
            }, 1500);
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
}

</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-form {
        width: 320px;
        padding: 30px;
        margin: 25vh auto 0;
        border-radius: 2px;
        box-shadow: 0px 0px 1px 0px gray;
        .cell {
            button {
                width: 100%;
                &:first-child {
                    margin-bottom: 10px;
                }
            }
        }
        :deep(.el-input__suffix),
        :deep(.el-input__prefix-inner) {
            display: flex;
            align-items: center;
        }
    }
}
</style>