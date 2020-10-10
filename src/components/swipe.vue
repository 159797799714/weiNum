<template>
  <div class="banner">
    <van-swipe :autoplay="autoplay" :indicator-color="indicatorColor" height="100%" @change="onChange" :vertical="vertical" :touchable="true" :show-indicators="indicators">
      <!-- <van-swipe-item v-for="(image, index) in imgList" :key="index" >
        <img :src="image"/>
      </van-swipe-item> -->
      <van-swipe-item>
        <img src="http://112.74.41.190/banner.png"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  name: 'banner',
  props: {
    imgList: Array,
    indicatorColor: {
      type: String,
      default: '#333333'
    },
    vertical: {
      type: Boolean,
      default: false
    },
    indicators: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Number,
      default: 5000
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onChange (e) {
      this.$emit('swipeChange', e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .banner{
    height: 100%;
    overflow: hidden;
  }
</style>
<style>
  .van-swipe{
    width: 100%;
    height: 100%;
  }
  .van-swipe-item{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .van-swipe__track{
    display: flex;
    height: 100%!important;
  }
  .van-swipe-item>img{
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
