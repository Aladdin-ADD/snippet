const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpackMerge = require('webpack-merge');

const common = {
    entry: {
        app: './src/app.js',
        vendors: [
            'vue',
            'vuex',
            'vue-router',
            'vuex-router-sync',
            'superagent',
            'sanitize.css/sanitize.css',
            'ramda',
            'element-ui',
        ],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors'),
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template.html',
            inject: false,
            minify: false,
        }),
    ],
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?cacheDirectory',
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader',
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader?name=[hash:8].[ext]',
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: 'style-loader!css-loader!sass-loader',
                },
                postcss: [
                    autoprefixer({
                        browsers: [
                            'last 5 versions',
                            '> 1%',
                        ],
                    }),
                ],
            },
        }],
    },
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, './src'),
        },
    },
    node: {
        process: false,
        setImmediate: false,
    },
    performance: {
        hints: false,
    },
};

const prod = {
    output: {
        publicPath: '/',
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[chunkhash:8].js',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
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
    ],
    stats: {
        children: false,
        chunks: false,
    },
    bail: true,
};

const dev = {
    output: {
        publicPath: '/',
        pathinfo: true,
        filename: '[name].[hash:8].js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    devtool: 'eval-source-map',
    profile: true,
    cache: true,
    devServer: {
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
        inline: true,
        hot: true,
        stats: {
            children: false,
            chunks: false,
        },
    },
};


const env = process.env.NODE_ENV || 'development';
let conf;
if (env === 'production') {
    conf = webpackMerge(common, prod);
} else {
    conf = webpackMerge(common, dev);
}

module.exports = conf;
