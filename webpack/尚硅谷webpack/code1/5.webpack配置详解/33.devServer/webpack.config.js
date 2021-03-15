const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname,'build'),
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
  mode: 'development',
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
  devServer: {
    // 开发服务器运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 监听contentBase目录下的所有文件，一旦文件变化，就会reload重载
    watchContentBase: true,
    watchOptions: {
      // 忽略 不见听node_modules代码
      ignored: /node_modules/
    },
    // 启动gzip压缩
    compress: true,
    // 开发服务器启动端口
    port: 5000,
    // 域名
    host: 'localhost',
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其他内容都不要打印
    quiet: true,
    // 如果出现错误，不要全屏提示
    overlay: false,
    // 服务器代理 --> 解决跨域问题（注意只能解决开发环境下的跨域，生产环境下用nginx做反向代理）
    proxy: {
      // 一旦devServer(5000端口)接收到 /api/xxx的请求，就会把请求转发到另外一个服务器('http://localhost:3000')
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：将 /api/xxx 改成 /xxx （去掉/api）
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}