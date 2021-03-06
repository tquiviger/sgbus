const path = require('path');
const webpack = require('webpack');

module.exports = {
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react')
        }
    },
    loader: {
        configEnvironment: 'production'
    },

    devtool: 'cheap-module-source-map'
    ,
    entry: [
        './app/index'
    ],
    externals: {
        'Config': JSON.stringify(require('/home/ec2-user/config/config.json'))
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
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
                loader: "style-loader!css-loader"
            }
        ]
    }
};