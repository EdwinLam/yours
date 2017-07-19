const router = require('koa-router')()
const UserController =new (require('../controller/UserController'))();
const WeiboController =new (require('../controller/WeiboController'))();

/*用户相关接口*/
router.get('/user/getUserInfo',UserController.getUserInfo)//获取用户信息
router.get('/user/queryUserByPage',UserController.queryUserByPage)//分页查询用户信息
router.post('/user/create',UserController.create)//创建用户
router.del('/user/:id',UserController.delete)//删除用户

/*微博api*/
router.get('/weibo/getAccessToken',WeiboController.getAccessToken)//获取token
router.get('/weibo/getUserInfo',WeiboController.getUserInfo)//获取token
router.get('/weibo/syncWeiboUser',WeiboController.syncWeiboUser)//同步微博用户

module.exports = router