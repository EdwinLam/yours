import auth from '../../api/auth'
import weibo from '../../api/weibo'
import iView from 'iview';
import router from '../../router';

import * as types from '../mutation-types'

const state = {
    userInfo: {},
    weiboUserInfo:{},
    token:'',
    pageInfo:{
        moduleName:'用户管理',
        functionName:'',
        detailName:''
    }
}

// getters
const getters = {
    jwt:state=>state.token,
    moduleName:state=>state.pageInfo.moduleName,
    functionName:state=>state.pageInfo.functionName,
    detailName:state=>state.pageInfo.detailName
}

// actions
const actions = {
    async login({commit}, {phone, password}) {
        const res = await auth.login(phone, password)
        if (res.data.success) {
            commit(types.LOGIN_SUCCESS, res.data)
        } else {
            commit(types.LOGIN_FAILURE, res.data)
        }
    },
    /*微博登录*/
    async weiboLogin({commit, state}, {code}) {
        const res = await weibo.ssoLogin(code)
        if(res.data.success){
            state.weiboUserInfo=res.data.weiboUserInfo;
            return new Promise(function(resolve) {
                if(res.data.userInfo!=null){
                    commit(types.LOGIN_SUCCESS,{userInfo:res.data.userInfo,token:res.data.token})
                }
                resolve();
            })
        }else{
            iView.Message.error(res.data.message)
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
    [types.LOGIN_SUCCESS] (state,{values,message}) {
        state.userInfo =values.userInfo
        state.token=values.token
        sessionStorage.setItem('storeData',JSON.stringify(state))
        iView.Message.success(message)
        router.push('/index')
    },

    [types.LOGIN_FAILURE] (state, {message}) {
        sessionStorage.removeItem('storeData')
        iView.Message.error(message)
        resetParam()
    },
    [types.LOGIN_OUT](){
        sessionStorage.removeItem('storeData')
        router.push('/login')
        resetParam()
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}