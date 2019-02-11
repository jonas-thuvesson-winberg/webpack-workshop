const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const createHtmlPluginInstance = fileName => {
  return new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', fileName),
    chunks: path.join(__dirname, 'src', fileName),
    filename: fileName
  });
};

generateHtmlPluginSetup = pages => {
  console.log('inside generate');

  const pluginInstances = [];
  pages.forEach(page => {
    pluginInstances.push(createHtmlPluginInstance(page));
    console.log(page);
  });
  return pluginInstances;
};

module.exports = generateHtmlPluginSetup;
