const router = require('koa-router')()
const UserController =new (require('../controller/UserController'))();
/*用户相关接口*/
router.get('/user/getUserInfo',UserController.getUserInfo)//获取用户信息
router.get('/user/queryUserByPage',UserController.queryUserByPage)//分页查询用户信息
router.post('/user/create',UserController.create)//创建用户

module.exports = router