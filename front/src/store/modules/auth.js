import auth from '../../api/auth'
import weibo from '../../api/weibo'
import iView from 'iview';
import router from '../../router';

import * as types from '../mutation-types'

const state = {
    userInfo: {},
    weiboUserInfo:{},
    token:"",
    pageInfo:{
        moduleName:"用户管理",
        functionName:"",
        detailName:""
    }
}

// getters
const getters = {
    jwt:state=>state.jwt,
    moduleName:state=>state.pageInfo.moduleName,
    functionName:state=>state.pageInfo.functionName,
    detailName:state=>state.pageInfo.detailName
}

// actions
const actions = {
    async login({commit, state}, {name, password}) {
        const res = await auth.login(name, password)
        if (res.data.success) {
            commit(types.LOGIN_SUCCESS, res.data)
            iView.Message.success("身份验证成功")
            router.push('/index')
        } else {
            commit(types.LOGIN_FAILURE, res.data)
            iView.Message.success(res.data.message)
            commit(types.ASSISTANT_SHOW_MSG, {msg:res.data.message,type:'error'} )
        }
    },
    async weiboLogin({commit, state}, {code}) {
        const res = await weibo.getUserInfo(code)
        if(res.data.userInfo!=null){
            commit(types.LOGIN_SUCCESS,{userInfo:res.data.userInfo,token:res.data.token,weiboUserInfo:res.data.weiboUserInfo})
            iView.Message.success("身份验证成功")
            router.push('/index')
        }
    },
    restoreData({commit, state}){
        const data=JSON.parse(sessionStorage.getItem('storeData'));
        if(data!=null){
            for(let key in data){
                state[key]  =data[key];
            }
        }
    }
}
const resetParam=function(){
    state.userInfo={}
    state.weiboUserInfo={}
    state.token=''
}

const mutations = {
    [types.LOGIN_SUCCESS] (state,{userInfo,token,weiboUserInfo}) {
        state.userInfo =userInfo
        state.token=token
        state.loginMessage="登录成功"
        state.weiboUserInfo=weiboUserInfo
        sessionStorage.setItem('storeData',JSON.stringify(state))
    },

    [types.LOGIN_FAILURE] (state, { message }) {
        sessionStorage.removeItem('storeData')
        resetParam()
    },
    [types.LOGIN_OUT](state){
        sessionStorage.removeItem('storeData')
        resetParam()
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}