
const state = {
  defaultPageSize : 10
}

// getters
const getters = {

}

const actions = {
  /*获取用户列表*/
  async queryPage({commit,state}, {bookKey ,pageNo, pageSize,condition}) {
    pageSize=pageSize||state.defaultPageSize
    const book = require('@/api/'+bookKey)
    const data = {
      pageNo,pageSize,condition
    }
    return new Promise((resolve, reject) => {
      book.queryPage(data).then(res => {
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