// 打包.html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  // 单入口
  // entry: './src/js/index.js'
  // 多入口：有几个入口，最终输出就有几个bundle（就是几个js文件）
  entry: {
    index: './src/js/index.js',
    test: './src/js/test.js'
  },
  output: {
    // [name] 意思是打包后的文件名为entry中对应的key
    // 比如上面index.js打包后文件名为main.js，而test.js打包后文件名为test.js
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  mode: 'production',
}