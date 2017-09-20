import {authApi} from '@/api/main'
import AuthUtil from '@/utils/AuthUtil'

import { getPassport } from '@/store/items/passport'
import router from '@/router'
import * as types from '@/store/mutation-types'

const state = {
  user: {},
  token:AuthUtil.getToken(),
  passport:{list:[],origin:''},
  knowNothing:true
}

const actions = {
  async leave({commit}) {
    return new Promise((resolve, reject) => {
      authApi.logout().then(response => {
        commit(types.VISITOR_FORGET_ME)
        resolve(response)
      }).catch(error => {
        commit(types.VISITOR_FORGET_ME)
        reject(error)
      })
    })
  },
  async rememberMyself({state,commit}){
    return new Promise((resolve, reject) => {
      if (AuthUtil.getToken()&&state.knowNothing) {
        authApi.getUserInfo(AuthUtil.getToken()).then(res => {
          if(state.knowNothing) {
            const auth = res.values.auth
            const user = res.values.userInfo
            const token = AuthUtil.getToken()
            commit(types.VISITOR_GET_PERMIT, {user, token, auth})
          }
          resolve()
        }).catch(() => {
          commit(types.VISITOR_FORGET_ME)
          reject()
        })
    }else{
        resolve()
      }
    })
  }
}

const mutations = {
  [types.VISITOR_GET_PERMIT] (state,{user,token,auth}) {
    state.user = user
    state.token = token
    state.passport = getPassport(auth)
    state.knowNothing = false
    AuthUtil.setToken(token)
    router.addRoutes(state.passport.list)
    router.addRoutes([{path: '*', redirect: '/404'}])
    router.addRoutes([{path: '/', redirect: state.passport.origin}])
  },

  [types.VISITOR_FORGET_ME] (state) {
    state.user = {}
    state.passport = {list:[],origin:''}
    state.knowNothing = true
    AuthUtil.removeToken()
  }
}

export default {
  state,
  actions,
  mutations
}