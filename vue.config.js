module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    devServer: {
        // 反向代理配置
        proxy: {
            '/boot': {
                // target: 'http://127.0.0.1:5050',
                target: 'http://192.168.2.124:5050',
                ws: true
            }
        }
    }
};
