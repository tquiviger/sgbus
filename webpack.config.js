const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react'),
            axios: path.resolve('./node_modules/axios')
        },
        extensions: ['', '.js', '.jsx']
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
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"}
        ]
    },
    plugins: [HTMLWebpackPluginConfig]
}
