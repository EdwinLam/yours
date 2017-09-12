import { getUserInfo ,logout} from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/authUtil'
import { getPassport } from '@/store/tools/passport'
import router from '../../router';

import * as types from '../mutation-types'

const state = {
  user: {},
  token:getToken(),
  passport:[],
  knowNothing:true
}
const actions = {
  async leave({commit}) {
    return new Promise((resolve, reject) => {
      logout().then(response => {
        commit(types.VISITOR_FORGET_ME)
        resolve(response)
      }).catch(error => {
        commit(types.VISITOR_FORGET_ME)
        reject(error)
      })
    })
  },
  rememberMyself({state,commit}){
    if (getToken()) { // 判断是否有token
      if (state.knowNothing) { // 判断当前用户是否已拉取完user_info信息
        getUserInfo(getToken()).then(res => {
          const auth = res.data.values.auth
          const user = res.data.values.userInfo
          const token = getToken()
          commit(types.VISITOR_GET_PERMIT,{user,token,auth})
          router.addRoutes(state.passport) // 动态添加可访问路由表
        }).catch(() => {
          commit(types.VISITOR_FORGET_ME)
        })
      }
    }
  }
}

const mutations = {
  [types.VISITOR_GET_PERMIT] (state,{user,token,auth}) {
    state.user = user
    state.token = token
    state.passport = getPassport(auth)
    state.knowNothing = false
    setToken(token)
  },
  [types.VISITOR_FORGET_ME] (state) {
    state.user = {}
    state.passport = []
    state.knowNothing = true
    removeToken()
  }
}

export default {
  state,
  actions,
  mutations
}