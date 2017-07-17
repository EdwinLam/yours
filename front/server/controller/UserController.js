const UserService = require('../service/UserService')
/*登录接口*/
const login = async function (ctx) {
    console.log(ctx)
    console.log("-----------body-----",ctx.request.body);
    console.log(ctx.request.body.name);
    console.log(ctx.request.body.password);

    ctx.body = await UserService.login(ctx.request.body.name, ctx.request.body.password)
}
/*获取用户信息接口*/
const getUserInfo=async function(ctx){
    ctx.body="获取用户信息"
}

module.exports = {
    login,
    getUserInfo
}
