const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt=require('koa-jwt')
const router = require('koa-router')()
const ApiRoute = require('./routes/ApiRoute')
const AuthRoute = require('./routes/AuthRoute')

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(async function(ctx, next){  //  如果JWT验证失败，返回验证失败信息
    try {
        await next();
    } catch (err) {
        if (401 === err.status) {
            ctx.status = 401;
            ctx.body = {
                success: false,
                token: null,
                info: 'Protected resource, use Authorization header to get access'
            };
        } else {
            throw err;
        }
    }
});

router.use('/auth', AuthRoute.routes()); // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use("/api",jwt({secret: 'panda'}),ApiRoute.routes()) // 所有走/api/打头的请求都需要经过jwt验证。
app.use(AuthRoute.routes(), AuthRoute.allowedMethods())
app.use(ApiRoute.routes(), ApiRoute.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


module.exports = app
