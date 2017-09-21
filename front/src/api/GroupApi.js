import fetch from './fetch'
import BaseApi from './BaseApi'

export default class GroupApi extends BaseApi{

  constructor () {
    super('group')
  }

  add(data) {
    return fetch({
      url: '/api/group/create',
      method: 'post',
      data
    })
  }

  updateById({id,data}) {
    return fetch({
      url: '/api/group/'+id,
      method: 'post',
      data
    })
  }

}