import auth from '../../api/auth'
import weibo from '../../api/weibo'

import * as types from '../mutation-types'

const state = {
    userInfo: {},
    weiboUserInfo:{},
    token:""
}

// getters
const getters = {
    jwt:state=>state.jwt,
}

// actions
const actions = {
    async login({commit, state}, {name, password}) {
        const res = await auth.login(name, password)
        if (res.data.success) {
            commit(types.LOGIN_SUCCESS, res.data)
            commit(types.ASSISTANT_SHOW_MSG,{msg:'登录成功',type:'success'})
            commit(types.ASSISTANT_REDIRECT, {path:'/index'})
        } else {
            commit(types.LOGIN_FAILURE, res.data)
            commit(types.ASSISTANT_SHOW_MSG, {msg:res.data.message,type:'error'} )
        }
    },
    async weiboLogin({commit, state}, {code}) {
        const res = await weibo.getUserInfo(code)
        if(res.data.userInfo!=null){
            commit(types.LOGIN_SUCCESS,{userInfo:res.data.userInfo,token:res.data.token,weiboUserInfo:res.data.weiboUserInfo})
            commit(types.ASSISTANT_SHOW_MSG,{msg:'登录成功',type:'success'})
            commit(types.ASSISTANT_REDIRECT, {path:'/index'})
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