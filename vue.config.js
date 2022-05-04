const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    configureWebpack: config => {
        // 开启gzip图片压缩
        if (CompressionWebpackPlugin) {
            const productionGzipExtensions = ['html', 'js', 'css'];
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp(
                        '\\.(' + productionGzipExtensions.join('|') + ')$'
                    ),
                    threshold: 10240, // 只有大小大于该值的资源会被处理10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false // 删除原文件
                })
            );
        }
    },
    devServer: {
        // 反向代理配置
        proxy: {
            '/boot': {
                // biz服务
                // target: 'http://127.0.0.1:8081',
                // third服务
                // target: 'http://127.0.0.1:8082',
                target: 'http://192.168.2.124:8080',
                ws: true,
                changeOrigin: true
            }
        }
    }
};
