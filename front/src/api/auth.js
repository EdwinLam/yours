import fetch from '@/utils/fetch'

export function login(phone, password) {
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

export function logout() {
  return fetch({
    url: '/auth/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return fetch({
    url: '/api/user/getUserInfo',
    method: 'get',
  })
}