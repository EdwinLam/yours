const SystemConfig=require('../config/SystemConfig')
const WeiboUserService =new (require('../service/WeiboUserService'))()
const UserService =new (require('../service/UserService'))()

class WeiboController{
    constructor() {
    }
    /*获取微博登录Token*/
    async getAccessToken(ctx) {
        ctx.body=await WeiboUserService.getAccessToken(ctx.query.code);
    }
    /*获取用户信息*/
     async getUserInfo(ctx) {
         let token=ctx.query.token;
         let uid=ctx.query.uid;
         let userInfo=null;
         let localToken='';
         if(token==null){
             const res=await WeiboUserService.getAccessToken(ctx.query.code);
             token=res.access_token;
             uid=res.uid;
             userInfo=await WeiboUserService.findOne({where:{weiboUid:uid}})
             localToken=UserService.createJwt(userInfo)
         }
         const weiboUserInfo=await WeiboUserService.getUserInfo(token,uid);
         ctx.body={userInfo:userInfo,weiboUserInfo:weiboUserInfo,token:localToken}
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
