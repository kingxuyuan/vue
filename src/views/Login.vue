<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 18:50:52
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-01-05 18:59:12
 * @Description: 登录页面
-->
<template>
    <div class="login">

   </div>
</template>

<script lang="ts">

import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
    setup() {
       const state = reactive({

       });
        return {
            ...toRefs(state)
       };
    },
});

</script>

<style lang="scss" scoped>
.login{
    display: block;
}
</style>