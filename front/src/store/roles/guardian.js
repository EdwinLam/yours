import {authApi} from '@/api/main'
import AuthUtil from '@/utils/AuthUtil'

const state = {
  whiteList : ['/login']
}

// getters
const getters = {

}

const actions = {
  async checkIdentity({commit}, {phone, password}) {
    return new Promise((resolve, reject) => {
      authApi.login(phone, password).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  showMeTheWay({commit},{passport,to, next}){
    if(AuthUtil.getToken()){
      if(to.path === '/login'){
        next({ path: passport.origin })
      }else{
        next()
      }
    }else if(to.path !== '/login'){
      next({ path: '/login' })
    }else{
      next()
    }
  }
}
const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}