const router = require('koa-router')()
const WeiboController =new (require('../controller/WeiboController'))();
/*微博api*/
router.get('/getAccessToken',WeiboController.getAccessToken)//获取token
router.get('/getUserInfo',WeiboController.getUserInfo)//获取token
router.get('/syncWeiboUser',WeiboController.syncWeiboUser)//同步微博用户

module.exports = router