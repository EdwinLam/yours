import auth from '../../api/auth'
import * as types from '../mutation-types'
import Vue from 'vue';

const state = {
    userInfo: {},
    weiboUserInfo:{},
    jwt:"",
    loginStatus: -1,//0-未登录 1-登录成功,
    loginMessage:""
}

// getters
const getters = {
    loginStatus: state => state.loginStatus,
    jwt:state=>state.jwt,
}

// actions
const actions = {
    async login({commit, state}, {name, password}) {
        console.log(name)
        commit(types.LOGIN_RESET)
        const res = await auth.login(name, password);
        if (res.data.success) {
            commit(types.LOGIN_SUCCESS, res.data)
        } else {
            commit(types.LOGIN_FAILURE, res.data)
        }
    },
    restoreData({commit, state}){
        const data=JSON.parse(sessionStorage.getItem('storeData'));
        if(data!=null){
            for(let key in data){
                state[key]  =data[key];
            }
        }else{
            commit(types.LOGIN_OUT);
        }

    }

}

const mutations = {
    [types.LOGIN_SUCCESS] (state,{userInfo,token}) {
        state.userInfo =userInfo
        state.jwt=token
        state.loginStatus=1
        state.loginMessage="登录成功"
        sessionStorage.setItem('storeData',JSON.stringify(state))
    },

    [types.LOGIN_FAILURE] (state, { message }) {
        state.loginStatus=0
        state.loginMessage=message

    },
    [types.LOGIN_RESET](state) {
        sessionStorage.removeItem('storeData');
        //重置权限相关参数
        state.userInfo={}
        state.weiboUserInfo={}
        state.jwt={}
    },
    [types.LOGIN_OUT](state){
        state.userInfo={}
        state.weiboUserInfo={}
        state.jwt={}
        state.loginStatus=0;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}