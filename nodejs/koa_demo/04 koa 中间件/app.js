var Koa = require('koa');
var router = require('koa-router')(); // 引入并实例化
var app = new Koa();

// koa中间件
// koa有以下四种中间件：
// 1、应用级中间件
// 2、路由级中间件
// 3、错误处理中间件
// 4、第三方中间件

// 匹配任何路由
app.use(async (ctx,next)=>{
  ctx.body = '中间件'
})

router.get('/',async (ctx)=>{
  ctx.body = '首页';
})
router.get('/news', async (ctx)=>{
  ctx.body = '这是个新闻页面';
})
router.get('/newsDetail', async (ctx)=>{
  ctx.body = '这是个新闻详情';
})

// 启动路由
app
  .use(router.routes()) // 作用： 启动路由
  .use(router.allowedMethods()); // 作用：官方推荐。自动根据ctx.status设置response的响应头

app.listen(3000,_=>{
  console.log('监听3000端口');
});