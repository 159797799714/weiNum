
import request from './request'
import api from '@/api/api'

import store from '../store'

// 解析url参数并获取code
export function getUrlCode () { // name为要获取的参数名
  var url = window.location.href
  console.log(url)
  // var url = 'http://test-doutui.mambike.com/index?code=001IR8000jAdaK1NJX200hM63N3IR80z&state=STATE'
  var obj = {}
  var num = url.indexOf('?')
  if (num != -1) {
    var str = url.slice(num + 1)
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      obj[strs[i].split('=')[0]] = (strs[i].split('=')[1])
    }
  }
  console.log(obj)
  var code = obj.code ? obj.code : ''
  if (code) {
    store.dispatch('loginIn', code)
  } else {
    getCodeUrl()
  }
  // store.dispatch('loginIn', '081NOm000pxSaK1BVE100cN7Q14NOm0d')
}

// 微信静默授权获取code链接
export async function getCodeUrl () {
  var local = window.location.href.split('?') // 获取页面url
  console.log(local)
  var res = await request({ url: api.authUrl, data: { url: local[0] } })
  if (res) {
    console.log('请求回调链接得到res', res.url)
    window.location.href = res.url
  }

  // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd92293402f73f76f&redirect_uri=http://test-doutui.mambike.com/index&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
}

// 计算分转换成元并保留两位小数
export function getYuan (money, length = 2) {
  money = money * 100 / 10000
  money = money.toString()
  let arr = money.split('.')
  if (arr.length < 2 && length > 0) { // 整数时
    let num = 1
    let str = num.toFixed(length).toString()
    str = str.split('.')
    money = money + '.' + str[1]
  } else if (arr[1].length < length) { // 不够位数
    let differLength = length - arr[1].length
    let num = 1
    let str = num.toFixed(differLength).toString()
    str = str.split('.')
    money = arr[0] + '.' + arr[1] + str[1]
  } else { // 够位数
    money = arr[0] + '.' + arr[1].substr(0, length)
  }
  return money
}

// 判断是否有值，没有返回空
export function filterData (data) {
  data = data ? data: ''
  return data
}
// 点击节流，形参time为时间内点击次数， sectionTime为多长时间内点击
let clickCartTime = 0
export function stopAction (time, sectionTime) {
  let that = this
  sectionTime = sectionTime ? sectionTime : 1000
  time = time ? time : 2
  clickCartTime += 1
  // 节流每秒最多点两次
  if (clickCartTime > time) {
    return false
  }
  setTimeout(function() {
    clickCartTime = 0
  }, sectionTime)
  return true
}

// 注册
export async function getWxconfig () {
  let that = this
  let url = window.location.href
  let res = await request({ url: api.wxConfig, data: { url: url } })
  console.log('获取getWxconfig', res)
  if (res) {
    console.log(location.href.split('#')[0])
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.app_id, // 必填，公众号的唯一标识
      timestamp: res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonce_str, // 必填，生成签名的随机串
      signature: res.signature, // 必填，签名
      jsApiList: ['downloadImage'] // 必填，需要使用的JS接口列表
    })
    wx.ready(function () {
      // 需在用户可能点击分享按钮前就先调用
      alert('readread好好好好好了')
    })
    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log('wxerror坏坏坏了', res)
      // alert('error', res)
    })
  }
}