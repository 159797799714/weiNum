<template>
  <div class="content t-left">
    <img src="@/static/index/invite.png" class="headImg">
    <div class="poster radius-16">
      <div class="poster-head bg-ff dis-flex flex-y-center">
        <img src="" class="head-img bg-ff">
        <div class="user col-10">
          <div class="name f-30">周达扬小小熊</div>
          <div class="word f-24">邀请你和我一起用短视频赚钱！</div>
        </div>
      </div>
      <div class="poster-img">
        <div class="qrcode"></div>
      </div>
    </div>
    <div class="footBox">
      <div class="btn bg-29 col-ff f-30 t-center" @click="savePoster">点击生成推广海报</div>
    </div>

    <!-- 弹窗 -->
    <popup ref="popup">
      <template v-slot:default>
        <div>
          <h1>弹窗</h1>
        </div>
      </template>
    </popup>
  </div>
</template>

<script>
import popup from '@/components/popup.vue'
export default {
  components: {
    popup
  },
  title: '邀请好友',
  data () {
    return {
    }
  },
  methods: {
    savePoster () {
      var that = this
      // console.log('点击了', t)
      // that.show = true
      this.$refs.popup.showPopup()
    }
  }
}
</script>

<style lang="scss" scoped>
 @import './index.scss';
</style>
