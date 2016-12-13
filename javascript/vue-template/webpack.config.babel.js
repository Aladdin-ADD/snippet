const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

const pages = glob.sync('./src/views/**/index.vue')
    .map((item) => `${item.slice(12, -4)}.html`)
    .map((filename) => {
        return new HtmlWebpackPlugin({
            filename,
            inject: false,
            template: './src/common/template.html',
            minify: {
                caseSensitive: true,
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                conservativeCollapse: false,
                decodeEntities: true,
                keepClosingSlash: true,
                minifyCSS: true,
                minifyJS: true,
                preserveLineBreaks: false,
                quoteCharacter: '"',
                sortAttributes: true,
                sortClassName: true,
                useShortDoctype: true,
            },
        });
    });

const common = {
    entry: {
        app: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[chunkhash:8].js',
    },
    plugins: (pages.concat([
        new ProgressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env),
            },
        }),
    ])),
    module: {
		rules: [{
			enforce: 'pre',
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'eslint-loader',
		}, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: [{
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                },
            }],
		}, {
            test: /\.css$/,
            loaders: [{
                loader: 'style-loader',
            }, {
                loader: 'css-loader',
            }],
        }, {
            test: /\.scss$/,
            loaders: [{
                loader: 'style-loader',
            }, {
                loader: 'css-loader',
            }, {
                loader: 'sass-loader',
            }],
        }, {
			test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
			loaders: [{
				loader: 'file-loader',
				query: {
					name: '[hash:8].[ext]',
				},
			}],
		}, {
            test: /\.vue$/,
            loaders: [{
                loader: 'vue-loader',
                options: {
                    postcss: [
                        require('autoprefixer')({
                            browsers: [
                                'last 5 versions',
                                '> 1%',
                            ],
                        }),
                    ],
                    loaders: {
                        scss: 'style-loader!css-loader!sass-loader',
                    },
                },
            }],
        }],
    },
    resolve: {
        modules: [
            'node_modules',
        ],
    },
    node: {
        process: false,
        setImmediate: false,
    },
    stats: {
        // modules: false,
        children: false,
        chunks: false,
        // chunkModules: false,
    },
};

let conf;
if (env === 'production') {
    const prod = {
        output: {
			publicPath: '/',
        },
        bail: true,
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
    };
    conf = webpackMerge(common, prod);
} else if (env === 'development') {
    const dev = {
        output: {
			publicPath: '/',
            pathinfo: true,
            filename: '[name].[hash:8].js',
        },
        devtool: 'eval-source-map',
        profile: true,
        cache: true,
        devServer: {
            host: 'localhost',
            port: 8080,
            contentBase: path.resolve('./dist'),
			historyApiFallback: true,
            inline: true,
            hot: true,
            stats: common.stats,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new webpack.NamedModulesPlugin(),
        ],
    };
    conf = webpackMerge(common, dev);
}

module.exports = conf;
