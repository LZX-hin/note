const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname,'build'),
  },
  module: {
    rules: [
      // loader配置
      {
        test: /\.css$/,
        // 多个loader用use（注意先后顺序，use中是从前面往上执行的）
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        // exclude用于排除文件，下面就是排除node_modules文件
        exclude: /node_modules/,
        // include 只检查路径下的文件，下面就是只检查src文件中的文件
        include: resolve(__dirname, 'src'),
        // 优先执行
        // enforce: 'pre',
        // 延后执行
        enforce: 'post',
        // 单个loader用loader
        loader: 'eslint-loader'
      },
      {
        // oneOf中只有一个loader用于处理文件的（这个配置是因为有些文件是不需要那个loader处理的，比如js文件就不需要css-loader，那么js文件只要被其他loader处理了，就不会再给oneOf中的其他loader处理了）
        oneOf: [
          {
            // ...loader
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development'
}