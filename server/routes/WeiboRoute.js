const router = require('koa-router')()
const WeiboService =new (require('../service/WeiboUserService'))();
/*微博api*/
router.get('/getUserInfo',(ctx)=>WeiboService.getUserInfo(ctx))//获取token

module.exports = router