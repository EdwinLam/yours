import { getUserInfo ,logout} from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getPassport } from '@/store/items/passport'
import router from '../../router'
import * as types from '../mutation-types'

const state = {
  user: {},
  token:getToken(),
  passport:{list:[],origin:''},
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
  async rememberMyself({state,commit}){
    return new Promise((resolve, reject) => {
      if (getToken()&&state.knowNothing) {
        getUserInfo(getToken()).then(res => {
          if(state.knowNothing) {
            const auth = res.data.values.auth
            const user = res.data.values.userInfo
            const token = getToken()
            commit(types.VISITOR_GET_PERMIT, {user, token, auth})
            router.addRoutes(state.passport.list)
            router.addRoutes([{path: '*', redirect: '/404'}])
            router.addRoutes([{path: '/', redirect: state.passport.origin}])
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
    setToken(token)
  },

  [types.VISITOR_FORGET_ME] (state) {
    state.user = {}
    state.passport = {list:[],origin:''}
    state.knowNothing = true
    removeToken()
  }
}

export default {
  state,
  actions,
  mutations
}