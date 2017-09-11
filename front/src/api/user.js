import fetch from '@/utils/fetch'


export function queryPage({pageNo,pageSize}) {
  const data = {
    pageNo,
    pageSize
  }
  return fetch({
    url: '/api/user/queryUserByPage',
    method: 'get',
    data
  })
}

export function isExistPhone({phone}) {
  return fetch({
    url: '/api/user/isExistPhone',
    method: 'get',
    params: { phone }
  })
}

export function add({name,password,phone}) {
  console.log({name,password,phone})
  const data = {
    name,
    password,
    phone
  }
  return fetch({
    url: '/api/user/create',
    method: 'post',
    data
  })
}

export function deleteById({id}) {
  return fetch({
    url: '/api/user/'+id,
    method: 'delete'
  })
}

export function updateById({id,name}) {
    const data={name}
  return fetch({
    url: '/api/user/'+id,
    method: 'post',
    data
  })
}