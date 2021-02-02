/*
  loader: 1、先在npm安装loader 2、配置loader
  plugins: 1、先在npm安装plugins 2、引入 3、配置plugins
*/

const { resolve } = require('path');
const HtmlWbpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [

    ]
  },
  plugins:[
    // 打包html html-webpack-plugin
    // 使用：new ***
    // 功能： 默认会创建一个空的HTML文件，自动引入打包输出的所有资源（JS、CSS）
    // 需求：需要有结果的HTML文件
    new HtmlWbpackPlugin({
      // template：会把所指向的HTML文件中的HTML结构复制到新创建的空的HTML文件中，并自动引入打包输出的所有资源（JS、CSS）
      template: './src/index.html'
    })
  ],
  mode: 'development'
}