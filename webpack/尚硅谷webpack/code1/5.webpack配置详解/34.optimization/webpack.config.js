const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname,'build'),
    chunkFilename: 'js/[name].[contenthash:10]_chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'production',
  // resolve规定模块如何被解析
  resolve: {
    // 配置解析模块路径别名，优点：简写路径（可以看index.js），缺点：没有路径提示
    alias:{
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.css', 'jsx'],
    // 告诉webpack解析模块去哪个目录
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      // *** 以下的这些配置是chunks: 'all'的默认配置
      // minSize: 30 * 1024, // 分割的chunk最小为30kb，也就是说文件小于30kb就不分割
      // maxSize: 0, // 最大的没有限制
      // minChunks: 1, // 要提取的chunk最少被引用1次（import引入）
      // maxAsyncRequest: 5, // 按需加载时，并行加载的文件的最大数量
      // maxInitialRequest: 3, // 入口js文件最大并行请求数量
      // automaticNameDelimiter: '~', // 名称命名连接符
      // name: true, // 可以使用命名规则
      // cacheGroups: { // 分割chunk的组
      //   // node_modules中的文件会被打包到vendors这个chunk中， --> vendors~xxx.js
      //   // 满足上面的公共规则，如大小要超过30kb，文件要被引用至少一次
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10 // 打包的优先级
      //   },
      //   default: {
      //     // 要提取的chunk至少要被引用2次
      //     minChunks: 2,
      //     priority: -20,
      //     // 如果当前要打包的模块和之前已经被提取的模块是同一个，就会复用
      //     reuseExistingChunk: true,
      //   }
      // }
    },
    // 将当前模块中记录其他引入模块的hash单独打包成一个文件runtime
    // 因为我们的入口文件为了可以引入其他文件，就要记住这些引入的文件的哈希值，一旦这些引入文件修改了，我们的入口文件是不能修改的，换言之入口文件从缓存中加载而不是重新从服务器请求，因此这个runtimeChunk配置是解决这个bug
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启用source-map
        sourceMap: true
      })
    ]
  }
}