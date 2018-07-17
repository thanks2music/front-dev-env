'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/**/*.js'),
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
        presets: ['env']
      }
    }],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app']
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      }
    })
  ]
}
