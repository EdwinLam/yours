const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt=require('koa-jwt')
const router = require('koa-router')()
var cors = require('koa2-cors')
const SystemConfig = require('./config/SystemConfig')
const ApiRoute = require('./routes/ApiRoute')
const AuthRoute = require('./routes/AuthRoute')
const WeiboRoute = require('./routes/WeiboRoute')

// error handler
onerror(app)

// middlewares
app.use(cors())
app.use(bodyparser())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = '验证失败！无法访问该资源！';
        } else {
            throw err;
        }
    });
});
router.use('/weibo', WeiboRoute.routes()) // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use('/auth', AuthRoute.routes()) // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use("/api",jwt({secret: SystemConfig.secret}),ApiRoute.routes()) // 所有走/api/打头的请求都需要经过jwt验证。
app.use(router.routes())// 将路由规则挂载到Koa上。

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


module.exports = app
