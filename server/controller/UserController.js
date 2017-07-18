const UserService =new (require('../service/UserService'))()
class UserController{
    constructor() {
    }
    async login(ctx) {
        ctx.body = await UserService.login(ctx.request.body.name, ctx.request.body.password);
    }
    getUserInfo(ctx){
        ctx.body="获取用户信息"
    }
    queryUserByPage(ctx){

    }
}

module.exports =UserController
