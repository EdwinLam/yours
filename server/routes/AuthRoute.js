const router = require('koa-router')()
const UserController = require('../controller/UserController');
/*用户相关接口*/
router.post('/login',UserController.login)//登录

module.exports = router