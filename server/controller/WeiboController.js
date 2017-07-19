const SystemConfig=require('../config/SystemConfig')
const axios =require('axios');
const qs =require('qs');
class WeiboController{
    constructor() {
    }
    /*获取微博登录Token*/
    async getAccessToken(ctx) {
        console.log(ctx.query);
        var postData= {
            'grant_type' : 'authorization_code',
            'code' : ctx.query.code,
            'redirect_uri' : SystemConfig.weibo_redirect_uri,
            'client_id':SystemConfig.weibo_client_id,
            'client_secret':SystemConfig.weibo_client_secret,
        };

        await axios.post(SystemConfig.weibo_url+"oauth2/access_token",qs.stringify(postData)).then((res) => {
            ctx.body=res.data
        }, (err) => {
            ctx.body=err.response.data
        })
    }
    /*获取微博登录Token*/
    async usersShow(ctx) {
        var postData= {
            params: {
                access_token : ctx.query.token,
                uid : ctx.query.uid,
                source:SystemConfig.weibo_client_id
            }

        };
        await axios.get(SystemConfig.weibo_url+"2/users/show.json",postData).then((res) => {
            ctx.body=res.data
        }, (err) => {
            ctx.body=err.response.data
        })
    }
}

module.exports =WeiboController
