import fetch from './fetch'
import BaseApi from './BaseApi'

export default class RoleApi extends BaseApi{

  constructor () {
    super('role')
  }

  add(data) {
    return fetch({
      url: '/api/role/create',
      method: 'post',
      data
    })
  }

  updateById({id,data}) {
    return fetch({
      url: '/api/role/'+id,
      method: 'post',
      data
    })
  }

}