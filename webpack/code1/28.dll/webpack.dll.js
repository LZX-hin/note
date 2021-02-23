/*
  使用dll技术，对某些库（第三方库jQuery、Vue、React...）进行单独打包
  当你运行webpack时，默认查找webpack.config.js配置文件
  需求：需要运行webpack.dll.js文件
    --> webpack --config webpack.dll.js
*/

const {resolve} = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的name ---> jquery
    // ['jquery'] --> 要打包的库是jquery
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname,'dll'),
    library: '[name]_[hash]', // 打包的库里面向外暴露的内容叫什么名字
  },
  plugins: [
    // 打包生成一个 manifest.json ---> 提供和jquery映射关系
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 需要映射的库暴露出来的名称，也就是上面output中的library
      path: resolve(__dirname,'dll/manifest.json') // 输出文件路径
    })
  ],
  mode: 'production'
}