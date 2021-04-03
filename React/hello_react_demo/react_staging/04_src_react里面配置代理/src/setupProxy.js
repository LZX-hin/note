const proxy = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        proxy('/api1',{ // 遇见请求url中带有‘/api1’这个前缀的请求，就会触发这个代理
            target: 'http://localhost:5000', // 请求转发给谁
            changeOrigin: true, // 控制服务器收到的请求头中Host字段的值
            pathRewrite: {'^/api1':''} // 重写请求地址（必须）
            // 如果后端接口中有这个“/api1”，这个pathRewrite就不用写，如果没有就一定要写pathRewrite来修改最终发送请求的url
        }),
        proxy('/api2',{
            target: 'http://localhost:5001',
            changeOrigin: true,
            pathRewrite: {'^/api2':''}
        })
    )
}