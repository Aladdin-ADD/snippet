import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import path from 'path';

export default {
    context: path.resolve('./src'),
    entry: {
        index: ['path/to/index']
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.css', '.json', '.vue', '.jsx'],
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                cacheDirectory: true,
                compact: false
            }
        }, {
            test: /\.css$/,
            loaders: [
                'style',
                'css?sourceMap'
            ]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            filename: 'filename.html',
            chunks: ['entry list']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    devtool: '#inline-source-map',
    debug: true,
    devServer: {
        contentBase: path.resolve('./dist'),
        historyApiFallback: true,
        inline: true,
        hot: true,
        stats: {
            chunks: false
        }
    },
    node: {
        process: false,
        setImmediate: false
    },
    bail: true
};
