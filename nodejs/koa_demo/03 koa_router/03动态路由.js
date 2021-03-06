
// koa动态路由

var Koa = require('koa');
var router = require('koa-router')(); // 引入并实例化
var app = new Koa();

// 配置路由
// ctx 上下文context，包含了requst和response等信息
router.get('/',async (ctx)=>{
  ctx.body = '首页'; // 返回数据 相当于原生的res.writeHead() res.end()
})
router.get('/news', async (ctx)=>{
  ctx.body = '这是个新闻页面';
})
router.get('/newsDetail/:aid', async (ctx)=>{
  // 获取动态路由的传值
  console.log(ctx.params)// ctx.params 获取动态路由的参数
  ctx.body = '新闻详情';
})
router.get('/newsDetails/:aid/:pid', async (ctx)=>{
  // 动态路由可以传多个值
  console.log(ctx.params)// ctx.params 获取动态路由的参数
  ctx.body = '新闻详情222';
})

// 启动路由
app
  .use(router.routes()) // 作用： 启动路由
  .use(router.allowedMethods()); // 作用：官方推荐。自动根据ctx.status设置response的响应头

app.listen(3000,_=>{
  console.log('监听3000端口');
});