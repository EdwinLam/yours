const BaseService =require('./BaseService');
const StringUtil=require('../util/StringUtil.js');
const jwt=require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const SystemConfig = require('../config/SystemConfig')

class UserService extends BaseService{
    constructor() {
        super('../models/ys_user');
    }
    async createUser(name,password){
        if(StringUtil.isNull(name)||StringUtil.isNull(password)){
            return {
                success:false,
                message:"用户名和密码不能为空"
            }
        }
        const user=await this.findOne({where:{name:name}});
        if(user==null){
            const salt = bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, salt);
            return super.create({name:name,password:password})
        }else{
            return {
                success:false,
                message:"已存在同名用户"
            }
        }
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
    async login(name,password){
        if(StringUtil.isNull(name)||StringUtil.isNull(password)){
            return {
                success:false,
                userInfo:[],
                message:"用户名和密码不能为空"
            }
        }
        const userInfo=await this.UserDao.findOne({
            where: {
                name: name
            }
        });
        if(userInfo!=null){
            if (bcrypt.compareSync(password, userInfo.password)) {
               return {token:this.createJwt(userInfo),userInfo:userInfo,success:true};
            }else{
                return {
                    success:false,
                    message:"密码错误"
                }
            }
        }else{
            return {
                success:false,
                message:"用户不存在"
            }
        }
    }
}
module.exports=UserService;