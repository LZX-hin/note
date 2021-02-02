const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname,'build')
  },
  module: {
    rules:[
      // eslint语法检查 eslint-loader eslint
      // 注意：只检查自己的代码，不检查第三方库的代码
      // 设置检查规则:
      //  package.json中eslintConfig中配置
      //  airbnb一套eslint规则  使用前需要安装这些包：eslint-config-airbnb-base eslint eslint-plugin-import
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint的错误
          fix:true
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}