'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'javascripts/main.js'),
    vendor: path.resolve(__dirname, 'javascripts/vendor.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/scripts'),
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'sub', 'vendor']
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      }
    })
  ]
}
