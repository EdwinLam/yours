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
    async queryUserByPage(ctx){
        let pageNo=ctx.query.pageNo||1;
        let pageSize=ctx.query.pageSize||10;
        ctx.body=await UserService.queryByPage({pageNo:parseInt(pageNo),pageSize:parseInt(pageSize)})
    }
    async create(ctx){
        ctx.body=await UserService.createUser(ctx.request.body.name,ctx.request.body.password)
    }
}

module.exports =UserController
