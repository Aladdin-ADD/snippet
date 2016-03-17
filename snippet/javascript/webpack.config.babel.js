import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import SplitByPathPlugin from 'webpack-split-by-path';

var env = process.env.NODE_ENV || 'development';

var config = {
    context: path.resolve('./src'),
    entry: {
        index: ['path/to/index']
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].js'
    },
    resolve: {
        extensions: ['', '.js', '.css', '.json', '.vue', '.jsx']
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint'
        }],
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
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ProgressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                pure_getters: true,
                screw_ie8: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new SplitByPathPlugin([{
            name: 'vendor',
            path: path.resolve('./node_modules')
        }]),
        new HtmlWebpackPlugin({
            filename: 'filename.html',
            chunks: ['entry list'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                collapseBooleanAttributes: true,
                removeTagWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                caseSensitive: true,
                minifyJS: true,
                minifyCSS: true,
                quoteCharacter: '"'
            }
        })
    ],
    node: {
        process: false,
        setImmediate: false
    },
    debug: false,
    bail: true
};


if (env === 'development') {
    config.debug = true;
    config.bail = false;
    config.devtool = '#inline-source-map';
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NoErrorsPlugin());
    config.devServer = {
        contentBase: path.resolve('./dist'),
        historyApiFallback: true,
        inline: true,
        hot: true,
        stats: {
            chunks: false
        }
    };
    config.module.preLoaders = undefined;
}

export
default config;
