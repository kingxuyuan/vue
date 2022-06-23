/*
 * @Author: 大侠传授两招吧
 * @Date: 2022-06-08 21:40:57
 * @LastEditors: 大侠传授两招吧
 * @LastEditTime: 2022-06-24 02:11:27
 * @Description:
 */
const path = require('path');
const dayjs = require('dayjs');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const networkIp = require('./networkIp.ts');
const envUrl = require('./env_url.ts');

const { NODE_ENV, VUE_APP_ENV } = process.env;
const resolve = (dir) => path.resolve(__dirname, dir);

const time = dayjs().format('YYYY_MM_DD_HH_mm_ss');
const isProdcution = NODE_ENV === 'production' ? true : false;
const params = JSON.parse(process.env.npm_config_argv).original[1]?.split('=') || ['--name', 'piqiu'];
const platformName = params[1];

if (params[0] !== '--name') {
    console.log('\x1b[31m');
    throw Error('操作错误，默认运行yarn serve，切换平台：yarn serve --name=name');
}
const platformConfig = require(`./platforms/${platformName}.json`);
const URL = envUrl(platformConfig, VUE_APP_ENV);

process.env.VUE_APP_PLATFORM_URL = URL;
process.env.VUE_APP_PLATFORM_CONFIG = platformConfig;

console.log(NODE_ENV, platformConfig);

module.exports = {
	// 静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
	filenameHashing: true,
	productionSourceMap: isProdcution,
	publicPath: "/",
	outputDir: "dist",
	assetsDir: "assets",
	indexPath: "index.html",
	pages: {
		index: {
			entry: resolve('src/pages/index.ts'), // 配置入口js文件
			template: resolve('./public/index.html'), // 主页面
			filename: "index.html", // 打包后的html文件名称
			title: "首页", // 打包后的.html中<title>标签的文本内容
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks: ["chunk-vendors", "chunk-common", "index"],
		},
		live: {
			entry: resolve('src/pages-live/index.ts'), // 配置入口js文件
			template: resolve('./public/live.html'), // 主页面
			filename: "live.html", // 打包后的html文件名称
			title: "直播房间", // 打包后的.html中<title>标签的文本内容
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks: ["chunk-vendors", "chunk-common", "live"],
		},
	},
    // 静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    css: {
        extract: isProdcution,
        sourceMap: isProdcution,
        loaderOptions: {
            scss: {
                prependData: `@import "@/assets/style/mixin.scss";`, // additionalData  prependData
            },
        },
    },
    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src')).set('@PComs', resolve(`./src/platforms/${platformName}/components`))
            // .set('@img', resolve('src/assets/images'))
            // .set('@p', resolve(`src/platform/${settingConfig.key}`));
        // config.plugin('html').tap((args) => {
        //     args[0].title = settingConfig.name;
        //     return args;
        // });
        // const svgRule = config.module.rule('svg');
        // // 清除已有的所有 loader。
        // // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        // svgRule.uses.clear();
        // // 添加要替换的 loader
        // svgRule.use('svg-sprite-loader').loader('svg-sprite-loader').options({
        //     symbolId: 'icon-[name]',
        // });
    },
    configureWebpack: config => {
        const plugins =  [
            new WebpackBar(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: resolve(`./src/platforms/${platformName}/images`),
                        to: 'img',
                    },
                    // {
                    //     from: resolve(`./platforms/${platform}/icons`),
                    //     to: 'img/icons',
                    // },
                    // {
                    //     from: resolve(`./platforms/${platform}/images/favicon.png`),
                    //     to: '.',
                    // },
                ],
            }),
        ]

        if(NODE_ENV === 'production') {
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path][base].gz',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + ['js', 'css', 'html'].join('|') + ')$'),
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    deleteOriginalAssets: false, // 删除原文件
                })
            )
            config.output = { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
                ...config.output,
                filename: `js/chunk-[name].${time}.js`,
                chunkFilename: `js/chunk-[name].${time}.js`
            }
            
            config.optimization = {
                ...config.optimization,
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            mangle: true, // 混淆，默认也是开的，mangle也是可以配置很多选项的，具体看后面的链接
                            compress: {
                                drop_console: true, //传true就是干掉所有的console.*这些函数的调用.
                                drop_debugger: true, //干掉那些debugger;
                                pure_funcs: ['console.log'], // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
                            },
                            format: {
                                comments: false,
                            },
                            extractComments: false, // 取出注释
                        },
                    }),
                ],
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    // minSize: 1024 * 100,
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
                                return `app.${packageName.replace('@', '')}`;
                            },
                        },
                    },
                },
            }
        } 
        config.plugins = [
            ...config.plugins,
            ...plugins
        ];
    },

    devServer: {
        host: networkIp(),
        proxy: {
            '/api': {
                target: URL.live_url,
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
            //     target: settingConfig.live_url,
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
        name: 'settingConfig.name',
        themeColor: '#fff',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        // configure the workbox plugin
        // workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            // swSrc: 'dev/sw.js',
            // ...other Workbox options...
            skipWaiting: true,
            clientsClaim: true,
        },
    },
};
