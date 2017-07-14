const router = require('koa-router')()
const DBUtil= require('../util/DBUtil')
const UserDao=DBUtil.getDao('../models/ys_user.js');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
    console.log(UserDao)
    const todolist = await UserDao.findAll()
    ctx.body = todolist
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
