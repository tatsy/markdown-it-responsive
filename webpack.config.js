'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: 'markdown-it-responsive.js',
    library: 'markdown-it-responsive.js',
    libraryTarget: 'umd'
  },

  node: {
    fs: 'empty'
  }
};
