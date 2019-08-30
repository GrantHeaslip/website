const path = require('path');

const AssetsPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = function(env, argv) {
    const isProductionBuild = (argv.mode === 'production');

    return {
        mode: 'development',
        entry: './src/server',
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: 'website-server.bundle.js'
        },
        'devtool': (
            isProductionBuild
                ? false
                : 'cheap-module-eval-source-map'
        ),
        node: {
            '__dirname': false,
        },
        target: 'node',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                BUILD_ENV: argv.mode,
            }),
            new AssetsPlugin({
                path: 'temp',
                filename: 'webpack-assets.json',
            }),
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin([
                {
                    context: 'src',
                    from: 'static/**/*',
                    to: '.'
                },
            ]),
            new MiniCssExtractPlugin({
                filename: 'static/assets/css/website-[contenthash].css',
            }),
            new DuplicatesPlugin({
                verbose: false,
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
                    test: /\.(ico|png|txt)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                context: 'src',
                                name: '[path][name]-[hash].[ext]',
                                outputPath: 'static',
                                publicPath: '/',
                            },
                        },
                    ]
                },
                {
                    test: /(manifest\.webmanifest|browserconfig\.xml)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                context: 'src',
                                name: '[path][name]-[hash].[ext]',
                                outputPath: 'static',
                                publicPath: '/',
                            }
                        },
                        {
                            loader: 'app-manifest-loader',
                        },
                    ],
                },
            ],
        },
    };
};
