import axios from 'axios'
import iView from 'iview'
import { getToken } from '@/utils/auth.js'
import router from '@/router'


// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (getToken()) {
    config.headers['Authorization'] =  'Bearer ' + getToken()
  }
  return config
}, error => {
  // Do something with request error
  iView.Message.error(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => response.data,

  error => {
    iView.Message.error(error.message)
    router.push({path: '/login'});
    return Promise.reject(error)
  }
)

export default service
