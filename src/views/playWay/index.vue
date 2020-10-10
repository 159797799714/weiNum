<template>
  <div class="content">
    <div class="nav dis-flex" ref="nav">
      <div v-for="(item, index) in navList" :key="index" ref="navli" :class="{'navli f-28 bg-29': true, 'selected col-14': selectIndex === index}" :style="navMargin" @click="selectNav(index)">{{item.name}}</div>
    </div>
    <div class="video-list">
      <div v-for="(item, index) in videoList" :key="index" class="video-item bg-ff t-left">
        <div class="p-re video-box">
          <video :src="item.videoSrc" x5-video-player-fullscreen="true" ref="video" @click="pause(index)"></video>
          <div v-if="!item.isplay" class="overPage">
            <img src="@/static/index/play.png" class="playIcon" @click="play(index)">
          </div>
          <img src="@/static/index/full.png" :class="{fullIcon: true}" @click="FullScreen(index)">
        </div>
        <div class="p-20">
          <div class="video-title f-28 oneline-hidden">{{item.title}}</div>
          <div class="video-info f-24 col-cc oneline-hidden">{{item.info}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  title: '新手教程',
  data () {
    return {
      navList: [{
        name: '新手教程'
      }, {
        name: '进阶教程'
      }, {
        name: '实操教程'
      }, {
        name: '爆单分析'
      }],
      selectIndex: 0,
      navMargin: '0',
      videoList: [{
        title: '这是一条测试视频数据？',
        info: '这是一条假数据假数据假数据',
        videoSrc: 'http://112.74.41.190/demo.mp4',
        isplay: false
      }]
    }
  },
  methods: {
    selectNav (index) {
      this.selectIndex = index
      // this.navMargin = index
      // let screenWidth = window.screen.width
      // let nav = this.$refs.nav,
      //   navli = this.$refs.navli[index];
      // console.log(navli)
      // console.log('screenWidth', screenWidth, 'scrollWidth', nav.scrollWidth, 'clientWidth', nav.clientWidth, 'scrollLeft', nav.scrollLeft, 'offsetLeft', navli.clientLeft)
    },
    // 点击播放
    play (index) {
      this.$refs.video[index].play()
      this.videoList[index].isplay = true
    },
    // 点击暂停
    pause (index) {
      this.$refs.video[index].pause()
      // let obj = this.videoList[index]
      // obj.isplay = false
      // this.$set(this.videoList, index, obj)
      this.videoList[index].isplay = false
    },
    // 进入全屏
    FullScreen (index) {
      var video = this.$refs.video[index]
      if (video.requestFullscreen) {
        video.requestFullscreen()
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen()
      } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen()
      }
    }
    // ,
    // 退出全屏
    // exitFullscreen (index) {
    //   var video = this.$refs.video[index]
    //   if (video.exitFullscreen) {
    //     video.exitFullscreen()
    //   } else if (video.mozCancelFullScreen) {
    //     video.mozCancelFullScreen()
    //   } else if (video.webkitCancelFullScreen) {
    //     video.webkitCancelFullScreen()
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
