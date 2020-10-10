<template>
  <div class="ercode-main t-center col-10 f-30">
    <div class="qrcode-name t-left f-bold f-32">职业趣味测一测</div>
    <div class="ercode-img p-re">
      <!-- <div id="qrcode" ref="qrcode" class="qrcode img p-re"></div> -->
      <img :src="imgUrl" class="img zindex-100">
    </div>
    <div class="col-10 line-34">长按保存推广二维码</div>
    <div class="downLoadIcon">
      <img src="@/static/index/down.png" class="dis-inline-block">
    </div>
    <div class="line-34">打开抖音扫一扫</div>
    <div class="footBtn col-ff f-28 dis-flex flex-y-center flex-x-center" @click="goVideo">
      <i>查看视频教程</i>
      <i class="iconfont f-34 iconyoujiantou v-center"></i>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'mycode',
  props: {
    imgUrl: String
  },
  watch: {
    imgUrl: {
      handler (newUrl) {
        this.codeUrl = newUrl
        // // 保证组件加载完执行
        // this.$nextTick (function () {
        //   console.log('code加载完成')
        //   this.getCode()
        // })
      }
    }
  },
  data () {
    return {
      qrcode: '',
      codeUrl: '',
      imgSrc: '' // 最终生成的base64图片
    }
  },
  methods: {
    // // 生成二维码
    // getCode () {
    //   let that = this
    //   let item = that.$refs.qrcode
    //   that.$refs.qrcode.innerHTML = '' // 清除前一个二维码
    //   let width = item.clientWidth
    //   let height = item.clientHeight
    //   console.log('qrcode', height, width)
    //   var qrcode = new QRCode(item, {
    //     text: that.codeUrl,
    //     width: width,
    //     height: height,
    //     backgounr: '#fff'
    //   })
    //   setTimeout(function () {
    //     var codeImg = document.getElementById('qrcode')
    //     var img = codeImg.getElementsByTagName('img')
    //     console.log('codeImg', codeImg, 'img', img)

    //     that.compress(img[0].src, 0.75, (base64) => {
    //       console.log(img[0].src, base64)
    //       that.imgSrc = base64
    //     })

    //     // that.imgSrc = img[0].src
    //   }, 500)
    // },
    goVideo () {
      this.$router.push({ name: 'playWay' })
    }
    // // 将base64压缩
    // /* 压缩base64图片，怎么压缩base64是题外话，这里不赘述 */
    // compress (
    //   base64, // 源图片
    //   rate = 1, // 缩放比例
    //   callback // 回调
    // ) {
    //   // 处理缩放，转格式
    //   var _img = new Image()
    //   _img.src = base64
    //   _img.onload = function() {
    //     var _canvas = document.createElement("canvas")
    //     var w = 308 / rate
    //     var h = 308 / rate
    //     _canvas.setAttribute("width", w)
    //     _canvas.setAttribute("height", h)
    //     _canvas.getContext("2d").drawImage(this, 0, 0, w, h)
    //     var base64 = _canvas.toDataURL("image/jpeg")
    //     callback(base64)
    //   }
    // }
  }
}
</script>

<style lang="scss" scopde>
.zindex-100{
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
  // 小程序弹窗
  .ercode-main{
    .line-34{line-height: .34rem;}
    .qrcode-name{
      padding: .24rem .4rem .89rem .4rem;
      line-height: .36rem;
    }
    .ercode-img{
      width: 100%;
      height: 3.48rem;
      overflow: hidden;
    }
    .img{
      height: 3.08rem;
      width: 3.08rem;
      margin: 0 auto .44rem;
    }
    .downLoadIcon{
      padding: .3rem 0 .26rem 0;
      &>img{
        display: inline-block;
        height: .36rem;
        width: .33rem;
      }
    }
    .footBtn{
      margin-top: .32rem;
      width: 6.4rem;
      height: .95rem;
      background: linear-gradient(114deg, #14CAE1, #8134F4);
      &>i{
        margin-left: .21rem;
      }
    }
  }
</style>