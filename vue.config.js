const path = require('path');
const TerserPlugin = require('terser-webpack-plugin'); // 去console插件
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // gzip压缩插件
const WebpackBar = require('webpackbar');
const { VUE_APP_ENV, VUE_APP_API_URL, VUE_APP_VIDEO_API_URL } = process.env;

const os = require('os');
const getNetworkIp = () => {
    let needHost = ''; // 打开的host
    try {
        // 获得网络接口列表
        let network = os.networkInterfaces();
        for (let dev in network) {
            let iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (
                    alias.family === 'IPv4' &&
                    alias.address !== '127.0.0.1' &&
                    !alias.internal
                ) {
                    needHost = alias.address;
                }
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    return needHost;
};

const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出文件目录
    outputDir: VUE_APP_ENV,
    // 用于嵌套生成的静态资产（js，css，img，fonts）的目录
    assetsDir: '',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)
    indexPath: 'index.html',
    // 静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    filenameHashing: true,
    // 以多页模式构建应用程序。
    pages: undefined,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 是否使用包含运行时编译器的Vue核心的构建。
    runtimeCompiler: false,
    // 默认情况下babel-loader忽略其中的所有文件node_modules。
    transpileDependencies: [],
    // 生产环境sourceMap
    productionSourceMap: false,
    // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性
    crossorigin: undefined,
    // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
    integrity: false,
    // webpack配置
    configureWebpack: (config) => {
        config.performance = {
            //打包文件大小配置
            maxEntrypointSize: 10000000,
            maxAssetSize: 30000000,
        };

        // config.name = name
        const plugins = [
            // gzip压缩
            // new CompressionWebpackPlugin({
            //     filename: '[path][base].gz',
            //     algorithm: 'gzip',
            //     test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
            //     threshold: 10240,
            //     minRatio: 0.8,
            // }),
            // // brotli压缩
            // new CompressionWebpackPlugin({
            //     filename: '[path][base].br',
            //     algorithm: 'brotliCompress',
            //     test: /\.(js|css|html|svg)$/,
            //     threshold: 10240,
            //     minRatio: 0.8,
            // }),
            // 打包进度
            new WebpackBar(),
        ];
        if (VUE_APP_ENV !== 'kmdev') {
            config.plugins = [...config.plugins, ...plugins];

            config.optimization = {
                ...config.optimization,
                minimize: true,
                minimizer: [
                    // 去console
                    new TerserPlugin({
                        terserOptions: {
                            compress: {
                                drop_console: true,
                                drop_debugger: true,
                            },
                        },
                    }),
                ],
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    cacheGroups: {
                        common: {
                            name: 'chunk-common',
                            chunks: 'initial',
                            minChunks: 2,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority: 1,
                            reuseExistingChunk: true,
                            enforce: true,
                        },
                        vendors: {
                            name: 'chunk-vendors',
                            test: /[\\/]node_modules[\\/]/,
                            chunks: 'initial',
                            priority: 2,
                            reuseExistingChunk: true,
                            enforce: true,
                        },
                        videojs: {
                            name: 'chunk-videojs',
                            test: /[\\/]node_modules[\\/]video\.js[\\/]/,
                            chunks: 'all',
                            priority: 3,
                            reuseExistingChunk: true,
                            enforce: true,
                        },
                        axiosAcheAdapter: {
                            name: 'chunk-axios-cache-adapter',
                            test: /[\\/]node_modules[\\/]axios-cache-adapter[\\/]/,
                            chunks: 'all',
                            priority: 4,
                            reuseExistingChunk: true,
                            enforce: true,
                        },
                    },
                },
            };
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src'));
    },
    // css相关配置
    css: {
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            scss: {
                // 全局引入变量和 mixin
                additionalData: `@import '@/assets/scss/index.scss';`,
            },
        },
    },
    // webpack-dev-server配置
    devServer: {
        open: true, // 打开浏览器
        host: getNetworkIp(),
        port: 8080,
        https: false,
        proxy: {
            '/userVideoV3': {
                target: VUE_APP_VIDEO_API_URL,
                changeOrigin: true,
                logLevel: 'debug',
                headers: {
                    Cookie: '',
                },
                pathRewrite: {
                    '^': '',
                },
            },
            '/videogg': {
                target: VUE_APP_VIDEO_API_URL,
                changeOrigin: true,
                logLevel: 'debug',
                headers: {
                    Cookie: '',
                },
                pathRewrite: {
                    '^': '',
                },
            },
            '/isVideoData': {
                target: VUE_APP_VIDEO_API_URL,
                changeOrigin: true,
                logLevel: 'debug',
                headers: {
                    Cookie: '',
                },
                pathRewrite: {
                    '^': '',
                },
            },
            '/api': {
                target: VUE_APP_API_URL,
                changeOrigin: true,
                logLevel: 'debug',
                headers: {
                    Cookie: '',
                },
                pathRewrite: {
                    '^': '',
                },
            },
        },
    },
    // 使用ts-import-plugin parallel设置为false，原因参考https://www.jianshu.com/p/201ed7363a56
    parallel: false,
    pwa: {
        name: '视频',
        description: 'Kumi By Vue 3.0',
        themeColor: '#222',
        msTileColor: '#222',
        workboxOptions: {
            skipWaiting: true,
            clientsClaim: true,
        },
    },
};
