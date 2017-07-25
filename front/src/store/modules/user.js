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
    async getUserItems({commit}, pageNo, pageSize) {
        pageSize=pageSize||10
        const res = await user.queryUserByPage(pageNo, pageSize)
        if (res.data.success)
            commit(types.GET_USER_ITEMS_SUCCESS, res.data)
         else
            commit(types.GET_USER_ITEMS_FAILURE, res.data)
    },
    async create({commit,dispatch}, {name,phone,password}) {
        console.log(password)
        const res = await user.create(name,phone,password)
        if (res.data.success) {
            await dispatch('getUserItems',1,10)
            commit(types.CREATE_USER_SUCCESS, res.data)
        }else
            commit(types.CREATE_USER_FAILURE, res.data)
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
}

export default {
    state,
    getters,
    actions,
    mutations
}