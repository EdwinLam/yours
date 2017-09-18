import fetch from '@/utils/fetch'

export function add(data) {
  return fetch({
    url: '/api/role/create',
    method: 'post',
    data
  })
}


export function queryPage({pageNo,pageSize}) {
  const data = {
    pageNo,
    pageSize
  }
  return fetch({
    url: '/api/role/queryByPage',
    method: 'get',
    data
  })
}

export function queryRoleTree() {
  return fetch({
    url: '/api/role/queryRoleTree',
    method: 'get'
  })
}