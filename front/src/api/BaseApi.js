import fetch from './fetch'

export default class BaseApi {

  constructor (key) {
    if (key) { this.key = key }
    this.queryPage = this.queryPage.bind(this)
  }

  queryPage ({pageNo, pageSize}) {
    console.log(this)
    const ctx = this
    const data = {
      pageNo,
      pageSize
    }
    return fetch({
      url: '/api/' + ctx.key + '/queryPage',
      method: 'get',
      data
    })
  }

  deleteById ({id}) {
    return fetch({
      url: '/api/' + this.key + '/' + id,
      method: 'delete'
    })
  }

  queryTree() {
    return fetch({
      url: '/api/'+ this.key + '/queryTree',
      method: 'get'
    })
  }
}