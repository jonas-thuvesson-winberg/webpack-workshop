const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const webpack = require('webpack');
const chokidar = require('chokidar');

module.exports = merge(common, {
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        include: [path.resolve(__dirname, 'src')],
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    before: function(_, server) {
      chokidar.watch(['./src/*.html', './src/*.scss']).on('all', function() {
        server.sockWrite(server.sockets, 'content-changed');
      });
    },
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    // compress: true,
    port: 9000
  }
});
