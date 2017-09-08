import user from '../../api/user'
import * as types from '../mutation-types'
import iView from 'iview';

const state = {
    userItems: [],
    total:10,
    pageNo:1,
    pageSize:10,
}

// getters
const getters = {

}

// actions
const actions = {
    /*获取用户列表*/
    async getUserItems({commit}, pageNo, pageSize) {
        pageSize=pageSize||10
        const res = await user.queryUserByPage(pageNo, pageSize)
        if (res.data.success)
            commit(types.GET_USER_ITEMS_SUCCESS, res.data)
        else
            commit(types.GET_USER_ITEMS_FAILURE, res.data)
    },
    /*创建用户*/
    async create({state,commit,dispatch}, {name,phone,password}) {
        const res = await user.create(name,phone,password)
        if (res.data.success) {
            await dispatch('getUserItems',1,state.pageSize)
            commit(types.CREATE_USER_SUCCESS, res.data)
        }else
            commit(types.CREATE_USER_FAILURE, res.data)
        return res.data.success
    },
    /*删除用户*/
    async deleteUser({commit,state,dispatch}, id){
        const res=await user.delete(id)
        if (res.data.success) {
            state.pageNo=state.userItems.length<=1&&state.pageNo>1?state.pageNo-1:state.pageNo
            await dispatch('getUserItems',state.pageNo,state.pageSize)
            commit(types.DELETE_USER_SUCCESS, res.data)
        }else
            commit(types.DELETE_USER_FAILURE, res.data)
        return res.data.success
    },
    /*更你用户*/
    async updateUser({commit,state,dispatch}, {id,name}){
        const res=await user.update(id,name)
        if (res.data.success) {
            await dispatch('getUserItems',state.pageNo,state.pageSize)
            commit(types.UPDATE_USER_SUCCESS, res.data)
        }else
            commit(types.UPDATE_USER_FAILURE, res.data)
        return res.data.success
    },
    /*是否存在手机用户*/
    async isExistPhone({commit}, phone){
        const res=await user.isExistPhone(phone)
        return res.data.success
    }
}

const mutations = {
    [types.GET_USER_ITEMS_SUCCESS] (state,{values}) {
        state.userItems=values.rows
        state.total=values.count
        state.pageNo=values.pageNo
    },

    [types.GET_USER_ITEMS_FAILURE] (state) {
        state.userItems=[]
        state.total=0
        state.pageNo=1
    },

    [types.CREATE_USER_SUCCESS] (state,{message}) {
        iView.Message.success(message)
    },
    [types.CREATE_USER_FAILURE] (state,{message}) {
        iView.Message.error(message)
    },
    [types.DELETE_USER_SUCCESS] (state,{message}) {
        iView.Message.success(message)
    },
    [types.DELETE_USER_FAILURE] (state,{message}) {
        iView.Message.error(message)
    },
    [types.UPDATE_USER_SUCCESS] (state,{message}) {
        iView.Message.success(message)
    },
    [types.UPDATE_USER_FAILURE] (state,{message}) {
        iView.Message.error(message)
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}