import fetch from '@/utils/fetch'

export default class AuthUtil {

  login (phone, password) {
    const data = {
      phone,
      password
    }
    return fetch({
      url: '/auth/login',
      method: 'post',
      data
    })
  }

   logout () {
    return fetch({
      url: '/auth/logout',
      method: 'post'
    })
  }

   getUserInfo () {
    return fetch({
      url: '/api/user/getUserInfo',
      method: 'get',
    })
  }

}