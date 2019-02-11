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
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
              hmr: true
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    before: function(_, server) {
      chokidar.watch(['./src/*.html']).on('all', function() {
        server.sockWrite(server.sockets, 'content-changed');
      });
    },
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    port: 9000
  }
});
