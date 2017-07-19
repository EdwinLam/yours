const SystemConfig=require('../config/SystemConfig')
const WeiboUserService =new (require('../service/WeiboUserService'))()

class WeiboController{
    constructor() {
    }
    /*获取微博登录Token*/
    async getAccessToken(ctx) {
        ctx.body=await WeiboUserService.getAccessToken(ctx.query.code);
    }
    /*获取用户信息*/
     async getUserInfo(ctx) {
        ctx.body=await WeiboUserService.getUserInfo(ctx.query.token,ctx.query.uid);
    }
    /*同步微博用户到本地*/
    async syncWeiboUser(ctx){
        //获取token信息
        const tokenInfo=await WeiboUserService.getAccessToken(ctx.query.code);
        //获取微博用户
        const userInfo=await WeiboUserService.getUserInfo(tokenInfo.access_token,tokenInfo.uid);
    }
}

module.exports =WeiboController
