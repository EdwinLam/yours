import { login} from '@/api/auth'

const state = {
  whiteList : ['/login']
}

// getters
const getters = {

}

const actions = {
  async checkIdentity({commit}, {phone, password}) {
    return new Promise((resolve, reject) => {
      login(phone, password).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
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