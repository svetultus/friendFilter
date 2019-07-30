const path = require('path');
const glob = require('glob');
const argv = require('yargs').argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/dist/');

const config = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: distPath,
    publicPath: '/'
  },
  //devtool: 'source-map',
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
  module: {
    rules: [
    {
      test: /\.html$/,
      use: 'html-loader'
    }, 
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: { cacheDirectory: true }
    }, 
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        { 
            loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            // loader: isProduction ? MiniCssExtractPlugin.loader, options: {publicPath: distPath}: 'style-loader',
        },
        {
            loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              isProduction ? require('cssnano') : () => {},
              require('autoprefixer')(
                //{ browsers: ['last 5 versions'] }
              )
            ]
          }
        },
        {
        loader: 'sass-loader', 
        // options: {
        //     sourceMap: true
        // }
        }
      ]
    }, {
      //test: /images[\\\/].+\.(gif|png|jpe?g|svg)$/i,
      test: /\.(gif|png|jpe?g|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },{
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 70
          }
        }
      },
      ],
    }, {
      test: /fonts[\\\/].+\.(otf|eot|svg|ttf|woff|woff2)$/i,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name][hash].[ext]'
        }
      },
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
    filename: 'style.css',
    chunkFilename: '[id].css'
    }),
    ...glob.sync('./src/*.html')
      .map(htmlFile => {
        return new HtmlWebpackPlugin({
          filename: path.basename(htmlFile),
          template: htmlFile
        });
      })
  ],
  optimization: isProduction ? {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
            drop_console: true
          },
        },
      }),
    ],
  } : {},
  devServer: {
    contentBase: '/',
    port: 8080,
    compress: true,
    open: false,
    hot: true
  }
};

module.exports = config;