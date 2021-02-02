var Koa = require('koa');
var app = new Koa();

// 配置路由

// 中间件
app.use(async ctx=>{
  // ctx.body 设置响应内容
  ctx.body = '你好koa2.x'
})

app.listen(3000,_=>{
  console.log('listen port:3000')
});