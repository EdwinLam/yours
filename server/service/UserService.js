const BaseService =require('./BaseService');
const StringUtil=require('../util/StringUtil.js');
const jwt=require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const SystemConfig = require('../config/SystemConfig')

class UserService extends BaseService{
    constructor() {
        super('../models/ys_user')
    }
    /**
     * 判断号码是否已经存在
     * @param {number} phone 电话号码
     */
    async isExistPhone(ctx){
        let phone=ctx.query.phone
        const user=await this.findOne({where:{phone:phone}})
        ctx.body=this.createResult(user!=null,(user!=null?"存在":"不存在")+phone+"手机的用户",{user:user})
    }
    /**
     * 新建用户
     * @param {String} name 用户名
     * @param {number} phone 电话号码
     * @param {number} password 密码
     */
    async createUser(ctx){
        let name=ctx.request.body.name
        let phone=ctx.request.body.phone
        let password=ctx.request.body.password
        if(StringUtil.isNull(phone)||StringUtil.isNull(password))
            ctx.body=this.createResult(false,"用户名和密码不能为空")
        const user=await this.findOne({where:{phone:phone}});
        if(user==null){
            const salt = bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, salt);
            ctx.body=this.createResult(true,"新建用户"+name+"成功",await this.create({name:name,password:password,phone:phone}))
        }else
           ctx.body=this.createResult(false,"已存在"+phone+"手机的用户")
    }

     createJwt(userInfo){
        if(userInfo==null)return "";
        const userToken = {
            name: userInfo.name,
            id: userInfo.id
        }
        const secret = SystemConfig.secret // 指定密钥
        const token = jwt.sign(userToken, secret) // 签发token
        return token;
    }

    /*
     * 登录
     * @param {String} name 用户名
     * @param {String} password 密码
     */
    async login(ctx){
        const phone= ctx.request.body.phone;
        const password= ctx.request.body.password;
        if(StringUtil.isNull(phone)||StringUtil.isNull(password))
            ctx.body=this.createResult(false,"手机号和密码不能为空")
        const userInfo=await this.UserDao.findOne({
            where: {
                phone: phone
            }
        });
        ctx.body=userInfo==null?this.createResult(false,"用户不存在"):
            bcrypt.compareSync(password, userInfo.password)?
                this.createResult(true,"身份验证成功",{token:this.createJwt(userInfo),userInfo:userInfo}):
                this.createResult(false,"密码错误")
    }
}
module.exports=new UserService();