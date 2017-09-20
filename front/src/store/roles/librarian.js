import * as Books from  '@/api/main'

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
    let book = Books[bookKey]
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
    let book = Books[bookKey]
    console.log(book)
    return new Promise((resolve, reject) => {
      book.add(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /*修改操作*/
  async update({commit}, {bookKey ,data}) {
    let book = Books[bookKey]
    return new Promise((resolve, reject) => {
      book.updateById(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /*删除操作*/
  async deleteById({commit}, {bookKey ,id}) {
    let book = Books[bookKey]
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
    let book = Books[bookKey]
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