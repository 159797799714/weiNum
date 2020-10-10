export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    async getWxconfig () {
      let that = this
      let url = window.location.href
      let res = await that.$request({ url: that.$api.wxConfig, data: { url: url } })
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
  }
}