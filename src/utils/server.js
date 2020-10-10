import axios from 'axios'
import store from '@/store'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? window.location.origin : 'http://test-doutui.mambike.com/api',
  timeout: 20000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + store.state.token
    // console.log('请求拦截器config', config)
    // if (store.getters.token) {
    //   config.headers.authorization = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // } else {
    //   if (sessionStorage.Authorization) {
    //     config.headers.authorization = sessionStorage.Authorization// 让每个请求携带自定义token 请根据实际情况自行修改
    //   }
    // }
    return config
  },
  error => {
    // Do something with request error
    // console.log('请求拦截error', error) // for debug
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    // console.log('响应拦截res', response.data.code)
    return Promise.resolve(response)
  },
  error => {
    console.log('响应拦截error', error) // for debug
    return Promise.reject(error)
  }
)

export default service
