const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // js兼容性处理：babel-loader @babel/core @babel/preset-env
      //  1、基本js兼容处理 ===> @babel/preset-env
      //    问题：只能转换些基本的语法比如：const，但是对promise这些无法转换
      //  2、全部js兼容处理 ===> @babel/polyfill
      //    问题：我只需要解决部分js兼容性问题，但是把全部处理js兼容性代码引入了，体积太大
      //  3、需要做兼容性处理的js就做：按需加载 ===> core-js，注意，使用按需加载就不能使用第二种方法@babel/polyfill
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          // 指示babel做怎么样的兼容性处理
          presets: [
            ['@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定corejs的版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到兼容哪个版本的浏览器
                targets: {
                  chrome: '60',
                  firefox: '50',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }]
          ]
        }
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