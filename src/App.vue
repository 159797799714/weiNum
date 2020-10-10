<template>
  <div id="app">
    <!-- <div v-if="!isWechat && title" class="head-title">{{ title }}</div> -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { getUrlCode, getWxconfig } from '@/utils/util'
export default {
  // name: 'App',
  data () {
    return {
      isWechat: false
    }
  },
  computed: {
    title: function () {
      return this.$store.state.title
    }
  },
  beforeMount () {
    // getUrlCode () // code获取token
    // 默认token赋值
    let data = {}
    data.openid = 'o_rvU6bNrVADMHeJufimkhK5AzB4'
    data.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOaWNrbmFtZSI6IuaMgeeslO-8huWGmeS9meeUnyIsIlN0YW5kYXJkQ2xhaW1zIjp7ImV4cCI6MTYwNTg5ODEyNywianRpIjoiNSIsImlhdCI6MTYwMjI5ODEyN30sIlJlZnJlc2hUaW1lIjoxNjAyMjk5OTI3fQ.HJxaPy_HGnEz2xl4fwDqrdo5PAAjOpzU1RmSxUHyxzY'
    localStorage.setItem('token', data.token)
    localStorage.setItem('oppenid', data.openid)
    this.$store.commit('setToken', data)
  },
  mounted () {
    // getWxconfig()
  },
  beforeUpdate () {
    var that = this
    var sUserAgent = navigator.userAgent.toLocaleLowerCase()
    var isWechat = sUserAgent.indexOf('wechatdevtools') > -1 || sUserAgent.indexOf('wechat') > -1
    that.isWechat = isWechat
    // if (isWechat) {
    //   document.title = that.$route.meta.title
    // } else {
    //   that.$store.commit('setTitle', that.$route.meta.title)
    // }
    that.$store.commit('setTitle', that.$route.meta.title)
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  line-height: 1;
  .head-title{
    height: .44rem;
    width: 100%;
    line-height: .44rem;
    text-align: center;
    color: #ffffff;
    font-size: .19rem;
    font-weight: bold;
    background: #101E39;
  }
  .main{
    flex: 1;
    background: #101E39;
    overflow: auto;
    display: flex;
  }
}
</style>
<style>
input {
  font-size: .26rem!important;
}
</style>

