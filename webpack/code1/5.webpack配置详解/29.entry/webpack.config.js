const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

/*
  entry: 入口
  1.string --> './src/index.js'
    单入口
    打包形成一个chunk。输出一个bundle文件。
    此时chunk名字默认是main
  2.array --> ['./src/index.js', './src/add.js']
    多入口
    所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件（main.js）
    也就是说会把index.js和add.js合并到一起打包输出
    --> 功能：只有在HMR功能中让html热更新生效
    *** 所以这种用数组的比较少用
  3.object
    多入口
    有几个入口文件就有几个chunk，输出几个bundle文件
    此时chunk名称是key

  总的来说第一种和第三种用得比较多，第二种很少用

  --> 特殊用法
  entry: {
    index: ['./src/index.js', './src/count.js'],
    add: './src/add.js'
  },
  这种用法就是把index.js和count.js一起打包，add.js另外打包
*/

module.exports = {
  entry: {
    index: ['./src/index.js', './src/count.js'],
    add: './src/add.js'
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname,'build')
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}