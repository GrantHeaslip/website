const path = require('path');

const AssetsPlugin = require('assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/server',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'website-server.bundle.js'
    },
    node: {
        '__dirname': false,
    },
    target: 'node',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx1']
    },
    plugins: [
        new AssetsPlugin({
            filename: 'temp/webpack-assets.json',
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/website-[contenthash].css',
        }),
    ],
    optimization: {
        noEmitOnErrors: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'linaria/loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.(ico|png|txt|webmanifest|xml)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: 'src',
                            name: '[path][name]-[hash].[ext]',
                        },
                    },
                ]
            }
        ],
    },
};
