/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-01-05 15:45:58
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-02-18 16:45:28
 * @Description: 
 */
import path from "path";
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression';                      // vite 插件压缩

import copy from 'rollup-plugin-copy' //引入插件
import { getNetworkIp } from './networkIP'

// https://vitejs.dev/config/
export default ({ mode }) => {

    const { VITE_API_URL } = loadEnv(mode, process.cwd());
    
    return defineConfig({
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),        //设置别名
                "/img": "/src/assets/images/",              //设置别名
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import '@/assets/styles/index.scss';`
                }
            }
        },
        plugins: [
            vue(),
            viteCompression(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            // copy({
            //     targets: [
            //         { 
            //             src: './src/assets/images', 
            //             dest: './outDir/pppp' 
            //         }, //执行拷贝
            //     ]
            // })
        ],

        server: {
            host: getNetworkIp(),
            port: 8888,
            proxy: {
                '/api': {
                    target: VITE_API_URL,
                    changeOrigin: true,
                    // secure: false,
                    // headers: {
                    //     cookie: '',
                    // },
                    // pathRewrite: {
                    //     '^/live': '/live',
                    // },
                },
                // '/live': {
                //     target: gConfig.live_url,
                //     changeOrigin: true,
                //     pathRewrite: {
                //         '^/live': '/api',
                //     },
                // },
            }
        },

        build: {
            terserOptions: {
                compress: {
                    drop_console: true
                }
            },
            rollupOptions: {
                output: {
                    entryFileNames: `js/[name][hash].js`,
                    chunkFileNames: `js/[name][hash].js`,
                    // assetFileNames: `images/[name][hash].[ext]`
                    assetFileNames: `[ext]/[name][hash].[ext]`
                }
            }
        }
    })
}