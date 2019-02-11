const path = require('path');
const generateHtmlPluginSetup = require('./generateHtmlPluginSetup');

const htmlFiles = ['index.html', 'other.html'];
const htmlPluginInstances = generateHtmlPluginSetup(htmlFiles);

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'main'),
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: htmlPluginInstances,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        query: {
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
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  }
};
