const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname,'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // 打包其他资源（除了html/js/css/图片之外的资源，比如字体图标）
      {
        // 可以通过test来匹配文件，也可以通过exclude来排除文件
        exclude: /\.(html|js|css)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',

  // 开发服务器 devServer：用来自动化，热更新（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server，要安装这个包
  devServer: {
    contentBase: resolve(__dirname,'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // true ===> 自动打开浏览器
    open: true,
  }
}