// 单独分离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 打包.html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

/*
  缓存：
    babel缓存
      cacheDirectory: true
    文件资源缓存
      hash：每次webpack打包构建会生成的唯一哈希值。
        问题：因为js和css文件同时使用一个hash值，如果重新打包，会导致所有缓存失效，
              即使我只修改了js代码，但是浏览器也会重新请求css文件资源
      chunkhash：根据chunk生成hash，如果打包来源于同一个chunk，hash值就一样
        问题：css文件和js文件的hash值还是一样的
        原因：因为css是在js文件中引入的，所以同属于一个chunk
      contenthash：根据文件的内容生成hash值，不同类型文件hash值不一样，这时就会根据你修改了哪个文件，就会重新加载哪个文件，
                   没修改的文件就从缓存中加载
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