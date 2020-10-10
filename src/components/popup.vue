<template>
  <div class="popup" ref="popupBox" style="display: none">
     <!-- @touchmove="touchmove" @touchstart="touchStart" @touchend="touchend" @click.prevent="hideBottomPopup(type)" -->
    <div v-if="type === 'center'" class="popup-main dis-flex flex-column flex-x-center flex-y-center" :class="show?'fadeIn': 'fadeOut'">
      <div class="container radius-16 over-hidden">
       <slot></slot>
       <div v-if="isModel" class="bottom-box f-28 t-center">
          <div class="btn cancel" @click="cancelAction">取消</div>
          <div class="btn sure" @click="submitAction">确定</div>
        </div>
      </div>
      <div v-if="hasClose" class="closeBox t-center">
        <i class="dis-inline-block iconfont iconguanbi col-99 closeIcon" @click="hidePopup"></i>
      </div>
    </div>

    <div v-else-if="type === 'bottom'" class="popup-bottom dis-flex flex-column flex-x-end"  :class="show?'bottomIn': 'bottomOut'">
      <div class="bottom-main bg-ff">
        <slot></slot>
      </div>
    </div>
    <canvas id="codeCanvas"></canvas>
  </div>
</template>

<script>
import { downLoadImage } from '@/utils/util'
export default {
  name: 'popup',
  props: {
    imgUrl: String,
    hasClose: {
      type: Boolean,
      default: true
    },
    isModel: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'center'
    }
  },
  data () {
    return {
      show: false,
      timer: null,
      touchTime: 0
    }
  },
  methods: {
    touchStart (e) {
      let that = this
      that.timer = setInterval(() => {
        if (that.touchTime > 1) {
          console.log('长按了两秒')
          that.$emit('pressAction')
          let qrcodeImg = document.getElementById('qrcode').getElementsByTagName('img')
          let imgSrc = qrcodeImg[0].src
          console.log('imgSrc', imgSrc)
          downLoadImage(imgSrc)
          clearTimeout(that.timer)
          that.timer = null
          return
        }
        that.touchTime += 1
      }, 1000)
    },
    touchend (e) {
      clearTimeout(this.timer)
      this.timer = null
      this.touchTime = 0
      console.log('点击结束', this.timer, this.touchTime)
    },
    touchmove (e) {
      clearTimeout(this.timer)
      this.timer = null
      this.touchTime = 0
    },
    showPopup () {
      // 先关闭原有的，防止多个弹窗同时出现
      // this.show = false
      // this.$refs.popupBox.style.display = 'none'

      this.show = true
      this.$refs.popupBox.style.display = 'flex'
    },
    hidePopup () {
      var that = this
      this.show = false
      this.$emit('cancelAction')
      let timer = setTimeout(function () {
        that.$refs.popupBox.style.display = 'none'
        timer = null
        clearTimeout(timer)
      }, 100)
    },
    hideBottomPopup (type) {
      if (type === 'center') {
        return
      }
      // this.hidePopup()
    },
    submitAction () {
      this.$emit('submitAction')
      // this.hidePopup()
    },
    cancelAction () {
      this.$emit('cancelAction')
      this.hidePopup()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/common/mixin.scss';
  #codeCanvas{
    display: none;
  }
  .popup{
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    // transition: 500ms;
  }
  .popup-main{
    position: relative;
    height:100%;
    width: 100%;
  }
  .popup-bottom{
    width: 100%;
  }
  .bottom-main{
    max-height: 7.5rem;
  }
  .container{
    background: #fff;
    max-width: 6.4rem;
    overflow-x: hidden;
  }
  // 底部按钮
  .bottom-box{
    text-align: center;
    padding-bottom: .32rem;
    .btn{
      display: inline-block;
      height: .8rem;
      width: 2.7rem;
      line-height: .8rem;
      border-radius: .1rem;
      border-width: 0.02rem;
      border-style: solid;
    }
    .cancel{
      margin-right: .2rem;
      border-color: #B6B6B6;
      color: #B6B6B6;
      background: $color-ff;
    }
    .sure{
      border-color: #11B1C6;
      background: #11B1C6;
      color: $color-ff;
    }
  }
  .closeBox{
    margin-top: .3rem;
    .closeIcon{
      font-size: .6rem;
      height: .6rem;
      width: .6rem;
    }
  }
  // 中间弹出
  .fadeIn{
    animation: fadeIn 0.15s ease;
  }
  .fadeOut{
    animation: fadeOut 0.15s ease;
  }
  @keyframes fadeIn{
    0% { transform: scale(0.7); opacity: 0; }
    100% { transform:scale(1); opacity: 1; }
  }
  @keyframes fadeOut{
    0% { transform: scale(1); opacity: 1; }
    100% { transform:scale(0.5); opacity: 0; }
  }

  // 底部弹出
  .bottomIn{
    animation: bottomIn 0.15s ease;
  }
  .bottomOut{
    animation: bottomOut 0.15s ease;
  }
  @keyframes bottomIn{
    0% { transform: translateY(100%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  @keyframes bottomOut{
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(100%); opacity: 0; }
  }
</style>
