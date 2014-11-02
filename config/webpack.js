/*!
 * Facebook React Starter Kit | https://github.com/kriasoft/react-starter-kit
 * Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
 */

/*
 * Webpack configuration. For more information visit
 * http://webpack.github.io/docs/configuration
 * https://github.com/petehunt/webpack-howto
 */

'use strict';

var webpack = require('webpack');
var path = require('path');

/*
 * Webpack config
 *
 * @param {String} DEST path
 * @param {Boolean} release
 */
module.exports = function(DEST, release) {
  return {
    output: {
      path: path.join(DEST, 'scripts/'),
      filename: 'client.js',
      publicPatch: path.join(DEST, 'scripts/')
    },

    cache: !release,
    debug: !release,
    devtool: false,
    entry: path.join(__dirname, '../src/scripts/client/client.js'),

    stats: {
      colors: true,
      reasons: !release
    },

    plugins: release ? [
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : [],

    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },

    resolveLoader: {
      modulesDirectories: [path.join(__dirname, '../node_modules')]
    },

    module: {
      preLoaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'jshint'
        }
      ],

      loaders: [
        {
          test: /\.css$/,
          loader: 'style!css'
        },
        {
          test: /\.less$/,
          loader: 'style!css!less'
        },
        {
          test: /\.gif/,
          loader: 'url-loader?limit=10000&mimetype=image/gif'
        },
        {
          test: /\.jpg/,
          loader: 'url-loader?limit=10000&mimetype=image/jpg'
        },
        {
          test: /\.png/,
          loader: 'url-loader?limit=10000&mimetype=image/png'
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'jsx-loader?harmony'
        }
      ]
    }
  };
};
