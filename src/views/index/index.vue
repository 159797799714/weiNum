<template>
  <div class="content">
    <div class="main">
      <div class="banner">
        <swiper :imgList="imgList" @swipeChange="swipeChange"></swiper>
        <img src="@/static/index/kefu.png" class="iconKefu" @click.stop="openKf">
      </div>
      <div class="box">
        <div class="post dis-flex f-24">
          <div class="post-left col-14">
            <em class="iconfont iconlaba f-36 v-top"/>
            <em class="f-bold f-26 v-top">公告</em>
          </div>
          <div class="post-center flex-1 t-left col-99">
            <div class="notice-box" :style="'transform: translateY(-'+top+')'">
              <div v-for="(item, index) in noticeList" :key="index" class="notice oneline-hidden">{{item.title}}</div>
            </div>
          </div>
          <div class="post-right">
            <em class="newIcon v-top col-99 f-20">NEW</em>
            <em class="iconfont dis-inline-block v-top iconmore_home f-24 col-ff"></em>
          </div>
        </div>
        <div class="menu dis-flex flex-x-around">
          <div v-for="(item, index) in menuList" :key="index" class="menu-item t-center" @click="goOtherPage(item)">
            <img :src="item.iconUrl" class="menuImg">
            <div class="menu-item-name col-99 f-24">{{item.name}}</div>
          </div>
        </div>

        <!-- 趣味游戏列表 -->
        <div class="module-box">
          <div v-for="(item, index) in moduleList" :key="index" class="module-item">
            <div class="module-title dis-flex flex-x-between">
              <div class="list-name f-bold col-14 f-36">{{item.ModuleName}}</div>
              <div class="more col-ff f-24" @click="lookMore(item)">
                查看更多<i class="iconfont iconmore_home f-20"></i>
              </div>
            </div>
            <div v-if="item.list.length > 0" class="module-banner p-re" @click="goDetail(item.list[0])">
              <div class="code-row dis-flex flex-x-between">
                <div class="type-name f-bold col-ff f-36">{{item.list[0].name}}</div>
                <div class="code-btn col-82 f-24" @click.stop="shareApp(item.list[0].id)">
                  <em class="dis-inline-block v-top iconfont iconerweima"></em>
                  <div class="dis-inline-block v-top">下载推广码</div>
                </div>
              </div>
              <div class="module-info dis-flex flex-x-between flex-y-center over-hidden">
                <div class="module-img">
                  <img :src="item.list[0].logo">
                </div>
                <div class="flex-1 t-left">
                  <div class="module-word f-24 col-cc oneline-hidden">{{item.list[0].summary}}</div>
                  <div class="f-22 grade-info v-b col-cc oneline-hidden">
                    昨日最高收益<i class="col-yellow f-30 f-bold dis-inline-block v-b">{{item.list[0].yesterday_income * 100 / 10000}}</i>元<i class="line f-26">|</i>自推比例 <i class="f-bold">{{item.list[0].commision_rate}}</i>%
                  </div>
                </div>
              </div>
            </div>
            <div v-if="item.list.length > 1" class="game-box">
              <div v-for="(obj, num) in item.list" :key="num" :item="obj">
                <appRow v-if="num > 0" :item=obj @goDetail="goDetail(obj)" @shareApp="shareApp(obj.id)"></appRow>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 小程序二维码弹窗 -->
    <popup ref="popup"  :imgUrl="codeImgUrl">
      <template v-slot:default>
        <mycode :imgUrl="codeImgUrl"></mycode>
      </template>
    </popup>

    <!-- 交流群弹窗 -->
    <popup ref="groupPopup" @pressAction="groupPress">
      <template v-slot:default>
        <div class="group-main t-center dis-flex flex-column flex-x-center">
          <div class="group-banner bg-29"></div>
          <img src="" class="group-code dis-inline-block bg-29">
          <div class="f-26 col-10 line-34">长按识别二维码联系客服进群</div>
          <img src="@/static/index/hand.png" alt="" class="hand-icon">
        </div>
      </template>
    </popup>

    <!-- 联系客服弹窗 -->
    <popup ref="kfPopup">
      <div class="group-main t-center dis-flex flex-column flex-x-center">
        <div class="title t-left col-10 f-bold f-32">联系客服</div>
        <img src="" class="group-code dis-inline-block bg-29">
        <div class="f-26 col-10 line-34">长按识别二维码联系客服经理</div>
        <img src="@/static/index/hand.png" alt="" class="hand-icon">
      </div>
    </popup>
  </div>
</template>

<script>
import swiper from '@/components/swipe.vue'
import popup from '@/components/popup.vue'
import mycode from '@/views/components/code.vue'
import appRow from '@/views/components/appRow.vue'

import appAction from '@/mixin/appAction'
export default {
  mixins: [appAction],
  title: '首页',
  components: { popup, swiper, mycode, appRow },
  data () {
    return {
      imgList: [{}, {}, {}],
      top: 0, // 公告偏移量
      timer: null, // 定时器
      noticeList: [],
      menuList: [{
        name: '玩法介绍',
        iconUrl: require('@/static/index/menu1.png'),
        pathName: 'playWay'
      }, {
        name: '单王排行',
        iconUrl: require('@/static/index/menu2.png'),
        pathName: 'ranking'
      }, 
      // {
      //   name: '邀请好友',
      //   iconUrl: require('@/static/index/menu3.png'),
      //   pathName: 'invite'
      // }, {
      //   name: '签到有礼',
      //   iconUrl: require('@/static/index/menu4.png')
      // }, 
      {
        name: '高手交流群',
        iconUrl: require('@/static/index/menu5.png')
      }],
      moduleList: [],
      isLoading: false
    }
  },
  created () {
    let that = this
    console.log(that.$route.meta.title)
    that.getNotices()
    that.getApplist()
  },
  methods: {
    // 公告列表
    async getNotices () {
      let that = this
      var res = await that.$request({ url: this.$api.notices })
      console.log('res公告列表', res)
      if (res) {
        that.noticeList = res
        let len = res.length
        // 公告定时滚动
        clearInterval(that.timer)
        that.timer = null
        let index = 0
        let itemH = 100 / len
        that.timer = setInterval(function () {
          index += 1
          if (index >= len) index = 0
          that.top = index * itemH + '%'
        }, 2000)
      }
    },
    // 小程序列表
    async getApplist () {
      let that = this
      var res = await that.$request({ url: this.$api.indexAppletList })
      console.log('小程序列表res', res)
      that.moduleList = res
    },
    swipeChange (e) {
      // console.log('执行了index的swipeChange', e)
    },
    openKf () {
      this.$refs.kfPopup.showPopup()
    },
    goOtherPage (item) {
      console.log('dianjile', item.pathName)
      if (item.name === '高手交流群') {
        this.groupPop()
        return
      }
      this.$router.push({ name: item.pathName })
    },
    // 交流群弹窗
    groupPop () {
      this.$refs.groupPopup.showPopup()
    },
    // 长按交流弹窗console.log
    groupPress () {
      console.log('长按交流按钮')
    },
    lookMore (item) {
      console.log(this.$route)
      this.$router.push({ name: 'moreApp', query: { id: item.ModuleId, ModuleName: item.ModuleName } })
    }
  },
  beforeDestroy () {
    console.log('执行了beforeDestroy')
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
