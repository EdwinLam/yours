import fetch from '@/utils/fetch'


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