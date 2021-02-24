const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname,'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
  // resolve规定模块如何被解析
  resolve: {
    // 配置解析模块路径别名，优点：简写路径（可以看index.js），缺点：没有路径提示
    alias:{
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.css', 'jsx'],
    // 告诉webpack解析模块去哪个目录
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  }
}