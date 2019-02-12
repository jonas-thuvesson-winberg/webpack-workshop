const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin(['dist'])]
});
