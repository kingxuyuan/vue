<!--
 * @Author: 大侠传授两招吧
 * @Date: 2022-02-21 20:07:22
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-24 13:57:12
 * @Description: 
-->
<template>
    <div class="notfound">
        <img src="https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3" />

        <div class="notfound-right">
            <div class="tips">
                <h1>哎呀！</h1>
                <div>版权所有<span>隔壁老王</span></div>
                <h3>不能进入这个页面...</h3>
                <h4>请检查您输入的网址是否正确，或点击下方按钮返回首页。</h4>
            </div>

            <el-button class="back-home" type="primary" round @click="$router.replace('/home')">返回首页</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.notfound {
    width: 100%;
    height: 100%;
    background-color: #e3e3e3;
    @include flexCenter();

    .back-home {
        min-width: 110px;
        margin-top: 30px;
        a {
            color: #fff;
        }
    }
    img {
        width: 555px;
        margin-left: -200px;
    }
    &-right {
        margin-top: 100px;
        margin-left: -100px;
        .tips {
            width: 300px;
            margin: auto;
            text-align: left;
        }
        h1 {
            font-size: $font-size-32;
            line-height: 40px;
            color: #1482f0;
        }
        h3 {
            color: #222;
            font-size: $font-size-20;
            font-weight: 600;
        }
        h4 {
            margin-top: 20px;
            color: grey;
            font-size: $font-size-13;
            line-height: 22px;
        }
        div {
            margin: 24px 0;
            font-size: $font-size-12;
        }
        span {
            margin-left: 4px;
            color: rgb(32, 160, 255);
        }
    }
}
</style>