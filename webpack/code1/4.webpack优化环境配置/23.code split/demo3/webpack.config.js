// 打包.html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  // 单入口
  entry: './src/js/index.js',
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
  /*
    可以将node_modules中代码（第三方库比如JQuery）单独打包成一个chunk最终输出，
    如果是多入口，还会自动分析这些入口文件中有没有比较大的（至少几十kb）公共的文件（比如都引入了JQuery），如果有，这些公共文件会打包成单独的一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production',
}