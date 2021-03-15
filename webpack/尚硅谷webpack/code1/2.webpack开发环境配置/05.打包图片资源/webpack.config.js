const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path:resolve(__dirname,'build'),
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // 使用多个loader的时候用use和数组
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 问题：默认处理不了html中的图片资源
        // 默认只能处理样式中的图片资源（比如background-image）的loader
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader时候用loader和字符串

        // 下载url-loader file-loader
        // url-loader依赖于file-loader
        loader: 'url-loader',
        // loader的配置
        options:{
          // 当发现图片大小小于8kb，就会被base64处理
          // 优点：减少请求次数
          // 缺点：图片体积会更大
          limit: 8*1024,
          // 重命名文件
          // [hash:10]：取哈希值的前十位
          // [ext]：文件扩展名。jpg、gif....
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        // 处理html文件中的图片资源（负责引入img，从而能够被url-loader处理）
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}