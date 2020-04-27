const webpack = require('webpack');
const path = require('path');
module.exports = {
    publicPath: './',
    outputDir: '../hello/www',
    assetsDir: 'static',

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', path.resolve(__dirname, './src'))
    },

    configureWebpack: {
        // 增加一个plugins
        plugins: [
            new webpack.ProvidePlugin({})
        ]
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },

    pluginOptions: {}
}