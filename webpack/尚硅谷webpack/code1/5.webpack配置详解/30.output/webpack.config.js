const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称（指定名称+目录）
    filename: 'js/[name].js',
    // 输出文件目录（将来所有资源输出的公共目录）
    path: resolve(__dirname,'build'),
    // 打包后的文件中，所有资源引入的路径的前缀（注意不是打包输出的路径，一般用于生产环境）
    // 比如打包后的html文件要引入index.js，如果不加这个publicPath: '/'，可以看到script标签的src是'js/index.js'
    // 加上publicPath: '/'之后，html文件中引入index.js的script标签的src是'/js/index.js'（当然，按照文件结构来看这个路径是错的，上面那个'js/index.js'才是对的）
    publicPath: '/',
    // 非入口chunk的文件名称
    // 什么叫非入口chunk的文件呢？
    // 1. 通过import()引入的文件 2.通过optimization配置分割node_modules，这些分割后的chunk也会用该名称
    chunkFilename: 'js/[name]_chunk.js',
    // 因为我们默认打包的js文件是包裹在一个匿名立即执行函数中的，这个library的意义就是为这个js文件给外界提供一个名字
    library: '[name]',
    // 变量名添加到哪个对象上，这里就是添加到window对象中了
    libraryTarget: 'window'
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development'
}