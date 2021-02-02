var Koa = require('koa');
var router = require('koa-router')(); // 引入并实例化
var app = new Koa();

router.get('/',async (ctx)=>{
  ctx.body = '首页';
})
router.get('/news', async (ctx)=>{
  console.log('3、匹配到news这个路由')
  ctx.body = '这是个新闻页面';
})
router.get('/newsDetail', async (ctx)=>{
  ctx.body = '这是个新闻详情';
})

app.use(async (ctx,next)=>{
  console.log('1、匹配路由前：中间件01')
  await next();
  console.log('5、匹配路由后：中间件01')
})

app.use(async (ctx,next)=>{
  console.log('2、匹配路由前：中间件02')
  await next();
  console.log('4、匹配路由后：中间件02')
})

// 启动路由
app
  .use(router.routes()) // 作用： 启动路由
  .use(router.allowedMethods()); // 作用：官方推荐。自动根据ctx.status设置response的响应头

app.listen(3000,_=>{
  console.log('监听3000端口');
});