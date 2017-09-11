
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
  },
  /*新增操作*/
  async add({commit}, {bookKey ,data}) {
    const book = require('@/api/'+bookKey)
    return new Promise((resolve, reject) => {
      book.add(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /*删除操作*/
  async deleteById({commit}, {bookKey ,id}) {
    const book = require('@/api/'+bookKey)
    const data = {
      id
    }
    return new Promise((resolve, reject) => {
      book.deleteById(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /*自定义操作*/
  async custom({commit}, {bookKey,method,data}) {
    const book = require('@/api/'+bookKey)
    return new Promise((resolve, reject) => {
      book[method](data).then(res => {
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