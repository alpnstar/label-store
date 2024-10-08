const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode,
    devtool,
    target,

    entry: ['@babel/polyfill', path.resolve(__dirname, './client/src/Index.tsx')],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@scss': path.resolve(__dirname, 'src/scss/')
        },
    },
    output: {
        path: path.resolve(__dirname, './bundle'),
        clean: true,
        filename: 'bundle.[contenthash].js',
    },
    devServer: {
        compress: false,
        hot: true,
        open: false,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './client/public/index.html'),
            minify: true,
        }),

        new MiniCssExtractPlugin(),
        new Dotenv({
            path: devMode ? './.env.dev' : './.env.prod',
        }),
        devMode ? new ReactRefreshWebpackPlugin() : null,
    ],

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {}
            },
            // {
            //     test: /\.tsx?$/,
            //     loader: 'ts-loader',
            //     exclude: '/node_modules/',
            //     options: {
            //     }
            //
            // },

            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            additionalData:
                                `
                                @import '${path.resolve(__dirname, 'client/src/scss')}/vars';
                                @import '${path.resolve(__dirname, 'client/src/scss')}/mixins';
                                `,

                            sassOptions: {
                                includePaths: [path.resolve(__dirname, 'client/src/scss')],
                            },
                        },
                    }

                ],
            },
            {

                test: /\.css$/i,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')]
                            }
                        }
                    },
                ],

            },
            {
                test: /\.(woff2?|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ],
                type: 'asset/resource',
                generator: {
                    filename: 'imgs/[contenthash][ext]'
                }

            },
            {
                test: /\.([jt])sx?$/,
                exclude: '/node/modules/',
                use: {
                    loader: 'babel-loader',
                },
            }
        ],
    },
}
