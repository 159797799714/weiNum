import { stopAction } from '@/utils/util'
export default {
  data () {
    return {
      codeImgUrl: ''
    }
  },
  computed: {
    // 获取当前路由的子路由
    routes () {
      var routes = {
        children: this.$router.options.routes
      }
      var route = this.$route.matched
      for (var i = 0; i < route.length - 1; i++) {
        routes = routes.children.find((e) => (e.name === route[i].name))
      }
      return routes.children
    }
  },
  methods: {
    // 二维码弹窗
    async shareApp (id) {
      var that = this
      that.$Loading('生成二维码中')
      if (!stopAction(1)) {
        that.$toast('点击过于频繁')
        return
      }
      // 生成小程序推广二维码
      let res = await that.$request({ url: that.$api.appletQrcode, data: { id: id, openid: that.$store.state.openid } })
      that.$Hideloading()
      that.codeImgUrl = res.url
      this.$refs.popup.showPopup()
    },
    goDetail (item) {
      console.log('进入详情页item', item, this.$route.matched)
      if (this.$route.matched[0].name === 'moduleDetail') {
        this.$router.replace({ name: 'moduleDetail', query: { id: item.id, name: item.name } })
        this.$router.go(0)
      } else {
        this.$router.push({ name: 'moduleDetail', query: { id: item.id, name: item.name } })
      }
    }
  }
}