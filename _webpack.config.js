const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./js/index.js'],
    output: {
        filename: "./bundle.js"
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './'
        },
    module:{
        rules:[
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, './modules/'),
                    path.resolve(__dirname, './mvc/')
                  ],
                exclude: path.resolve(__dirname, './node_modules/'),
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets: 'env'
                    }
                }
                
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, './scss/')
                ],
                exclude: path.resolve(__dirname, './node_modules/'),
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    "sass-loader"
                  ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: path.resolve(__dirname, "style.css"),
            //chunkFilename: "[id].css"
        })
    ]
}