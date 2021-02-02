var Koa = require('koa');
var router = require('koa-router')(); // 引入并实例化
var app = new Koa();

// koa中间件
// 路由级中间件

router.get('/',async (ctx)=>{
  ctx.body = '首页';
})
// 匹配到news路由以后继续往下匹配
router.get('/news', async (ctx,next)=>{
  console.log('这是一个新闻');
  await next();
  // 因为这里没有响应内容，所以客户端报 not found
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