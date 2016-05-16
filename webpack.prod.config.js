const path = require('path')
const webpack = require('webpack')

module.exports = {
    loader: {
        configEnvironment: 'production'
    },
    entry: [
        './app/index'
    ],
    externals: {
        'Config': JSON.stringify(require('/home/ec2-user/config/config.json'))
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'index_bundle.js',
        publicPath: '/assets/'
    },

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.scss?$/,
                loader: 'style!css!sass',
                include: path.join(__dirname, 'src', 'styles')
            },
            {
                test: /\.(svg|png)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            }
        ]
    }
}