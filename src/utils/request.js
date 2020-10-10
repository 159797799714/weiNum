import service from '@/utils/server.js'
import store from '../store'
import { getCodeUrl } from '@/utils/util.js'

var request = function (Data, isreturnMsg) { // Data为一个对象{url: xxx, method: xxx, data: xxx}  isreturnMsg为空或不传默认返回res.data.data不含状态码code
  let that = this
  var method = Data.method ? Data.method : 'get'
  var data = Data.data ? Data.data : {}
  var obj = {
    url: Data.url,
    method: method,
    data: method !== 'get' ? data : '',
    params: method === 'get' ? data : ''
  }
  return new Promise((resolve, reject) => {
    service.request(obj).then(res => {
      console.log('request返回值', res)
      switch (res.data.code) {
        case 0: // 成功
          if (isreturnMsg) {
            resolve(res.data)
          } else {
            resolve(res.data.data)
          }
          break
        case 1: // 通用错误信息
          that.$toast(res.data.msg)
          if (isreturnMsg) {
            resolve(res.data)
          } else {
            resolve(null)
          }
          console.log('通用错误了错误了xxxxxxxxxxx', res)
          break
        case 401: // token失效需要重新登录
          that.$toast('登录失效,正在重登')
          console.log('登录失效')
          getCodeUrl()
          resolve(null)
          break
        case 403: // 没有权限
          that.$toast('暂无权限')
          console.log('没有权限访问此接口')
          resolve(null)
          break
        default: // 其他错误
          that.$toast('其他错误')
          console.log('其他错误')
          resolve(null)
          break
      }
    }).catch(err => {
      that.$toast('请求出错')
      reject(err)
    })
  })
}

export default request


