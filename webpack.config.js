const path = require('path')

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
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets: 'env'
                    }
                }
                
            }
        ]
    },
}