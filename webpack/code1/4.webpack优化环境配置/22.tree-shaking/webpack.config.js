// 单独分离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 打包.html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

/*
  tree-shaking：去除没有运行的代码
    前提： 1.必须使用ES6模块化 2.开启mode: 'production'环境
    作用：减小代码体积

    在package.json中配置
    "sideEffects": false 所有代码都没有副作用（都进行tree-shaking）
      问题：可能会把css/@babel/polyfill文件干掉
    "sideEffects": ['*.css'] 表示css文件不进行tree-shaking
*/

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

// 复用loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // 还需要在package.json中定义browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')()
      ]
    }
  }
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        // 在package.json中添加eslintConfig配置eslint检查规则 ===> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // enforce: 'pre'表示优先执行eslint-loader
        // 先执行eslint-loader，再执行babel-laoder
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        // 以下loader只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件，比如eslsint和babel都是处理js文件，那么我们可以把eslint-loader不放在oneOf中就好
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader,'less-loader']
          },
          // 正常来讲，一个文件只能同时被一个loader处理
          // 当一个文件要被多个loader处理，那么一定要指定loader的执行先后顺序
          // 先执行eslint，再执行babel
          // 原因：如果先将es6+语法转换成es5，再进行js语法检查，就会报很多错
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {version: 3},
                    targets: {
                      chrome: '60',
                      firefox: '50',
                    }
                  }
                ]
              ],
              // 开启babel缓存
              // 第二次构建打包时会读取缓存
              cacheDirectory: true
            }
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8*1024,
              name: '[contenthash:10].[ext]',
              outputPath: 'imgs',
              esModule: false,
              publicPath: './'
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            exclude: /\.(js|css|less|html|jpg|png|gif)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'media'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  mode: 'production',
  devtool: 'source-map'
}