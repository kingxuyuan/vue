/*
 * @Author: 大侠传授两招吧
 * @Date: 2021-11-10 00:16:36
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2021-11-15 03:00:36
 * @Description:
 */
const os = require('os');
const path = require('path');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { VUE_APP_ENV } = process.env;
const env = VUE_APP_ENV === 'development';

const resolve = (dir) => path.resolve(__dirname, dir);
const params = JSON.parse(process.env.npm_config_argv).original[1]?.split('=') || ['--name', 'default'];
const platform = params[1];
if (params[0] !== '--name') {
    console.log('\x1b[31m');
    throw Error(
        '操作错误，默认运行yarn serve，切换平台：yarn serve --name=name',
    );
}

const gConfig = require(`./platforms/${platform}/config.json`);
console.log(gConfig);

/**
 * @description: 获取电脑的IPv4
 * @return {* needHost IP 地址}
 * @author: 大侠传授两招吧
 */
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

module.exports = {
    productionSourceMap: env ? true : false,
    outputDir: 'dist', //build输出目录
    css: {
        sourceMap: false,
        loaderOptions: {
            scss: {
                prependData: `@import "@/assets/style/minix/index.scss";`,
            },
        },
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@c', resolve('src/components'));
        config.plugin('html').tap((args) => {
            args[0].title = '自定义title';
            return args;
        });
        const svgRule = config.module.rule('svg');
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear();
        // 添加要替换的 loader
        svgRule.use('svg-sprite-loader').loader('svg-sprite-loader').options({
            symbolId: 'icon-[name]',
        });
    },
    configureWebpack: (config) => {
        let plugins = [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: resolve(`./platforms/${platform}/images`),
                        to: 'img',
                    },
                    {
                        from: resolve(`./platforms/${platform}/favicon.png`),
                        to: '.',
                    },
                ],
            }),
            new WebpackBar(),
        ];
        config.plugins = [...config.plugins, ...plugins];

        config.output.filename = `js/[name][contenthash].js?`;
        config.output.chunkFilename = `js/[name][contenthash].js?`;
        
        config.optimization = {
            ...config.optimization,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        mangle: true, // 混淆，默认也是开的，mangle也是可以配置很多选项的，具体看后面的链接
                        compress: {
                            drop_console: true, //传true就是干掉所有的console.*这些函数的调用.
                            drop_debugger: true, //干掉那些debugger;
                            pure_funcs: ['console.log'], // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
                        },
                    },
                }),
            ],
            // 开启分离js
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 1024 * 100,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                            )[1];
                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace('@', '')}`;
                        },
                    },
                },
            },
            // splitChunks: {
            //     chunks: 'all',
            //     maxInitialRequests: Infinity,
            //     cacheGroups: {
            //         common: {
            //             name: 'chunk-common',
            //             chunks: 'initial',
            //             minChunks: 2,
            //             maxInitialRequests: 5,
            //             minSize: 0,
            //             priority: 1,
            //             reuseExistingChunk: true,
            //             enforce: true,
            //         },
            //         vendors: {
            //             name: 'chunk-vendors',
            //             test: /[\\/]node_modules[\\/]/,
            //             chunks: 'initial',
            //             priority: 2,
            //             reuseExistingChunk: true,
            //             enforce: true,
            //         },
            //         videojs: {
            //             name: 'chunk-videojs',
            //             test: /[\\/]node_modules[\\/]video\.js[\\/]/,
            //             chunks: 'all',
            //             priority: 3,
            //             reuseExistingChunk: true,
            //             enforce: true,
            //         },
            //     },
            // },
        };
    },
    devServer: {
        host: getNetworkIp(),
        proxy: {
            '/live': {
                target: gConfig.url,
                changeOrigin: true,
                // secure: false,
                // headers: {
                //     cookie: '',
                // },
                pathRewrite: {
                    '^/live': '/live',
                },
            },
            // '/live': {
            //     target: gConfig.live_url,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/live': '/api',
            //     },
            // },
        },
    },
    // 使用ts-import-plugin parallel设置为false，原因参考https://www.jianshu.com/p/201ed7363a56
    parallel: false,
    pwa: {
        name: 'My App',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        // workboxPluginMode: 'InjectManifest',
        // workboxOptions: {
        // swSrc is required in InjectManifest mode.
        //   swSrc: 'dev/sw.js',
        // ...other Workbox options...
        // }
    },
};
