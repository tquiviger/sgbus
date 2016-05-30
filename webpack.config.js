const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react'),
        }
    },
    loader: {
        configEnvironment: 'development'
    },
    entry: [
        './app/index.js'
    ],
    externals: {
        'Config': JSON.stringify(require('/Users/thomas/sgbus/config.json'))
    },
    output: {
        path: __dirname + '/dist',
        filename: "index_bundle.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    plugins: [HTMLWebpackPluginConfig]
}
