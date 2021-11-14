<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="short-video-content">
        <div id="artplayer-app"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, watch, onMounted } from 'vue';

import Hls from 'hls.js';
import Artplayer from 'artplayer';
import _ from 'lodash';
import { Decode } from '@/configs/decode';
import { imgDecode } from '@/configs/imgDecode';
import { VideoItemType } from '@/types/api/shortVideo';

//自定义loader加载视频
class XhrLoader extends Hls.DefaultConfig.loader {
    constructor(config: any) {
        super(config);
        let load = this.load.bind(this);

        this.load = function (context: any, config: any, callbacks: any) {
            if (
                context.url.includes('.key') ||
                context.url.includes('.ts') ||
                context.url.includes('.m3u8')
            ) {
                context.url = Decode(context.url).md5Path;
            }

            load(context, config, callbacks);
        };
    }
}
export default defineComponent({
    props: {
        info: {
            type: Object as PropType<VideoItemType>,
            default: {} as VideoItemType,
        },
    },
    setup(props) {
        const data = reactive({
            player: null as any,
        });

        const InitPlayer = async (playerUrl: string) => {
            data.player = new Artplayer({
                container: '#artplayer-app',
                url: Decode(playerUrl).md5Path,
                autoplay: true,
                poster: await imgDecode(props.info.video_img),
                autoSize: true,
                loop: true,
                mutex: true,
                theme: '#ffad00',
                fullscreen: true,
                fullscreenWeb: true,
                miniProgressBar: true,
                moreVideoAttr: {
                    playsInline: true,
                    'webkit-playsinline': true,
                    'x5-video-player-type': 'h5',
                    'x5-video-player-fullscreen': false,
                    'x5-video-orientation': 'portraint',
                },

                customType: {
                    m3u8: async function (video: any, url: any) {
                        let hls = await new Hls({
                            loader: XhrLoader,
                        });

                        hls.loadSource(url);
                        hls.attachMedia(video);
                        if (!video.src) {
                            console.log(video.src, 8888);

                            video.src = url;
                        }
                    },
                },
            });
        };
        onMounted(() => {
            data.player?.destroy();
            data.player = null;
            InitPlayer(props.info.video_path);
        });

        return {};
    },
});
</script>

<style scoped lang="scss">
.short-video-content {
    width: 100%;
    height: 100%;
    #artplayer-app {
        width: 100%;
        height: 100%;
    }
}
</style>
