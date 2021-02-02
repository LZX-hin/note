var Koa = require('koa');
var router = require('koa-router')(); // 引入并实例化
var app = new Koa();

// koa中间件
// 应用级中间件
// 每次匹配路有前做的操作

router.get('/',async (ctx)=>{
  ctx.body = '首页';
})
router.get('/news', async (ctx)=>{
  console.log('新闻业')
  ctx.body = '这是个新闻页面';
})
router.get('/newsDetail', async (ctx)=>{
  ctx.body = '这是个新闻详情';
})

app.use(async (ctx,next)=>{
  console.log('中间件')
  // next方法前的代码是匹配路由前做的操作
  await next();
  // next方法后的代码是完成匹配路由后的操作
  if(ctx.status == 404){
    // 错误处理
    ctx.status = 404;
    ctx.body = '这是一个 404 页面'
  }else{
    console.log(ctx.url)
  }
  // 所以这里当我们访问/news的时候，打印顺序是：
  // 中间件 ===> 新闻业 ===> /news
})

// 启动路由
app
  .use(router.routes()) // 作用： 启动路由
  .use(router.allowedMethods()); // 作用：官方推荐。自动根据ctx.status设置response的响应头

app.listen(3000,_=>{
  console.log('监听3000端口');
});