const { resolve } = require('path');
const HtmlWbpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  plugins:[
    new HtmlWbpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production',
  externals: {
    // 库名：npm包名
    // 拒绝jQuery被打包进来
    jquery: 'jQuery'
  }
}