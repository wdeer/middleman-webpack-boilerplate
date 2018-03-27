// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const Jarvis = require("webpack-jarvis");
const extractSASS = new ExtractTextPlugin('./css/[name].css');

const config = {
  context: path.resolve(__dirname, '../../source'),

  entry: {
    main: './js/main.js'
  },

  output: {
    path: path.resolve(__dirname, '../../', 'dist'),
    filename: './js/[name].js',
  },

  resolve: {
    extensions: ['.js', '.scss'],
    modules: ['node_modules', 'bower_components'],
    alias: {
      jquery: 'jquery/src/jquery'
    }
  }, // resolve

  module: {

    rules: [

      //babel-loader
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../../source', 'js')],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env']
          }
        }
      },

      // sass-loader
      {
        test: /\.s?css$/,
        include: [path.resolve(__dirname, '../../source', 'scss')],
        use: extractSASS.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: 'style-loader'
        })
      },

      // img-loader
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        include: [path.resolve(__dirname, '../../source', 'images')],
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
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
      },

      //file-loader(for fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: [path.resolve(__dirname, '../../source', 'fonts')],
        use: ['file-loader']
      }

    ] // rules

  }, // module
  plugins: [
    extractSASS,
    new CleanWebpackPlugin(
      [
        '../../dist',
        '../../build'
      ],
      {
        watch: true,
        root: ''
      }
    ),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:4567/',
        browser: "Firefox Developer Edition"
      },
      {
        reloadDelay: 3000
      }
    ),
    new Jarvis({
      port: 1337
    }),
    new ManifestPlugin({
      publicPath: '/',
      writeToFileEmit: true
    })
  ]
};

module.exports = config;
