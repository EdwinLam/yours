var express = require('express');
var app = express();
const https = require('https');
var weiboConfig=require('./config/weiboConfig.js');

//解决跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/authorize',function(req,res){
    https.get(weiboConfig.weiboUrl+'/oauth2/authorize',{

    }, (res) => {
        console.log('状态码：', res.statusCode);
        console.log('请求头：', res.headers);
    }).on('error', (e) => {
        console.error(e);
    });
    //返回的json对象
    var obj = {
        code: 0,
        list: [
            {name: '苹果'},
            {name: '香蕉'},
            {name: '梨子'}
        ]
    };

    res.jsonp(obj);
});
console.log("启动服务器");
//启动服务，监听一个端口，不要和页面的端口
app.listen(3030);