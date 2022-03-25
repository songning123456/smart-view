module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    devServer: {
        // 反向代理配置
        proxy: {
            '/boot': {
                target: 'http://127.0.0.1:5050',
                ws: true
            }
        }
    }
};
