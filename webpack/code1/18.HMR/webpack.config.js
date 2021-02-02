
/*
  运行项目指令：
    webpack：会将打包结果输出
    npx webpack-dev-server：只会在内存中编译打包，没有输出
*/

// HMR 就是在开发模式下，使用dev-server的时候，使项目更新样式等非js的时候，不用重新加载js

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname,'build'),
    publicPath: '/build'
  },
  module: {
    rules: [
      {
        // 处理less资源
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        // 处理图片资源（url-loader默认只能处理样式中的图片资源）
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          outputPath: 'imgs' // 指定输出到build中的imgs文件下
        }
      },
      {
        // 处理html中的图片资源
        test: /.html$/,
        loader: 'html-loader'
      },
      {
        // 处理其他资源（如字体图标）
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media' // 指定输出到build中的media文件下
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname,'build'),
    open: true,
    compress: true,
    port: 3000,
    hot: true
  }
}