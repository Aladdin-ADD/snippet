import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import path from 'path';

export default {
    context: __dirname,
    entry: {
        filename: ['source/file']
    },
    output: {
        path: path.join(__dirname, 'output/dir'),
        filename: '[name].js'
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
        })
    ],
    devtool: '#inline-source-map',
    debug: true,
    devServer: {
        //contentBase: 'output/dir',
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
