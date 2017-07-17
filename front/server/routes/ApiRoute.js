const router = require('koa-router')()
const UserController = require('../controller/UserController');
/*用户相关接口*/
router.get('/user/getUserInfo',UserController.getUserInfo)//获取用户信息

module.exports = router