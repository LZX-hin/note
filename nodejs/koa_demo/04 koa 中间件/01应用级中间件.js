var Koa = require('koa');
var router = require('koa-router')(); // 引入并实例化
var app = new Koa();

// koa中间件
// 应用级中间件
// 每次匹配路有前做的操作

// 匹配任何路由
app.use(async (ctx,next)=>{
  console.log(new Date()) // 每次匹配路由前打印当前日期
  await next(); // 表示当前路由匹配完成后，继续向下匹配
  // 如果不写await next()，不会继续往下执行，在这里就是不执行router.get('/',function(){...})及后面内容
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