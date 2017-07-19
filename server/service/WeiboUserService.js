const BaseService =require('./BaseService')
const StringUtil=require('../util/StringUtil')
const SystemConfig = require('../config/SystemConfig')
const axios =require('axios');
const qs =require('qs');
class WeiboUserService extends BaseService{
    constructor() {
        super('../models/ys_user');
    }
    /*获取微博登录Token*/
    async getAccessToken(code) {
        let result={};
        const postData= {
            'grant_type' : 'authorization_code',
            'code' : code,
            'redirect_uri' : SystemConfig.weibo_redirect_uri,
            'client_id':SystemConfig.weibo_client_id,
            'client_secret':SystemConfig.weibo_client_secret,
        };

        await axios.post(SystemConfig.weibo_url+"oauth2/access_token",qs.stringify(postData)).then((res) => {
            result= res.data
        }, (err) => {
            result= err.response.data
        })
        return result;
    }
    /*获取用户信息*/
    async getUserInfo(accessToken,uid) {
        let result={};
        const postData= {
            params: {
                access_token : accessToken,
                uid : uid,
                source:SystemConfig.weibo_client_id
            }
        };
        await axios.get(SystemConfig.weibo_url+"2/users/show.json",postData).then((res) => {
            result=res.data
        }, (err) => {
            result= err.response.data
        })
        return result;
    }
}
module.exports=WeiboUserService;