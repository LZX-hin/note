/*
  webpack.config.js  webpack配置文件
    作用：指示webpack干什么（当运行webpack指令时，会加载里面的内容）
    
    所有构建工具都是基于nodeJs平台运行的，模块化默认采用commonJs
*/

// nodeJs的resolve方法用来拼接出路径
const { resolve } = require('path');

module.exports = {
  // webpack配置
  // 入口文件
  entry: './src/index.js',
  // 输出
  output: {
    // 输出的文件名
    filename: 'built.js',
    // 输出路径
    // 拼接绝对路径：__dirname为当前文件的绝对路径，跟'build'拼接起来，就是build的绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader配置
  module: {
    rules: [
      // 详细的loader配置
      // 不同文件必须配置不同的loader css/less ...
      {
        // 匹配的文件（一般用正则）
        test: /\.css$/,
        // 使用什么loader解析匹配到的文件
        // use加载loader是 从后往前执行的，也就是先执行css-loader，再执行style-loader
        use: [
          // 创建<style>标签，将js中的样式放到<style>标签中，再把<style>标签放到<head></head>标签中
          'style-loader',
          // 将css以commonJs的方式加载到js文件中，内容是字符串形式的css样式
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要安装两个包：less和less-loader       npm i less less-loader -D
          'less-loader',
        ]
      }
    ]
  },
  // plugins配置
  plugins: [
    // 详细的plugins配置...
  ],
  // 模式
  mode: 'development'
}