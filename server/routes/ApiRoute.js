const router = require('koa-router')()
const UserService =require('../service/UserService')

/*用户相关接口*/
router.get('/user/queryUserByPage',(ctx)=>UserService.queryByPage(ctx))//分页查询用户信息
router.get('/user/isExistPhone',(ctx)=>UserService.isExistPhone(ctx))//分页查询用户信息
router.post('/user/create',(ctx)=>UserService.createUser(ctx))//创建用户
router.del('/user/:id',(ctx)=>UserService.destroy(ctx))//删除用户
router.post('/user/:id',(ctx)=>UserService.updateUser(ctx))//更新用户
module.exports = router