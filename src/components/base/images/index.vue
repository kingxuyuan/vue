<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <img :src="defaultSrc" alt="" v-if="defaultSrc" />
    <!-- 短视频图片 -->
    <img :src="imgUrl" alt="" v-else-if="noLazy" />
    <img v-lazy="imgUrl" alt="" v-else />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUpdated, watch } from 'vue';
import { imgDecode } from '@/configs/imgDecode';
import { forageStore } from '@/utils/cacheAdapter';

export default defineComponent({
    props: {
        src: {
            type: String,
            default: '',
            required: true,
        },
        defaultSrc: {
            type: String,
            default: '',
        },
        noLazy: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const imgUrl = ref('');
        const alreadyUrl = ref('');

        //如果缓存中有，就从缓存中拿
        const getImgUrl = async () => {
            // alreadyUrl.value = await imgDecode(props.src);

            const protocol = window.location.protocol;
            let newPropsSrc = '';
            if (protocol.includes('https:')) {
                newPropsSrc = props.src.replace('http://', 'https://'); //地址替换https
            } else {
                newPropsSrc = props.src.replace('https://', 'http://'); //地址替换http
            }
            const caheValue: any = await forageStore.getItem(newPropsSrc);

            if (caheValue) {
                alreadyUrl.value = caheValue;
            } else {
                alreadyUrl.value = await imgDecode(newPropsSrc);
            }
        };
        watch(
            () => alreadyUrl.value,
            (val) => {
                if (val) {
                    imgUrl.value = val;
                }
            },
        );

        onMounted(() => {
            getImgUrl();
        });

        return {
            imgUrl,
        };
    },
});
</script>

<style scoped></style>
