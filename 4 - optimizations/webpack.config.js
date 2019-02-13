const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const generateHtmlPluginSetup = require('./generateHtmlPluginSetup');

const htmlFiles = ['index.html', 'other.html'];
const htmlPluginInstances = generateHtmlPluginSetup(htmlFiles);

plugins = [
  new CleanWebpackPlugin(['dist']),
  new MiniCssExtractPlugin({
    filename: 'styles.[hash].css'
  })
].concat(htmlPluginInstances);

module.exports = {
  entry: path.join(__dirname, 'src', 'main'),
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'img/',
              publicPath: 'img/'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  }
};
