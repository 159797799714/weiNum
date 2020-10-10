<template>
  <div class="content t-left">
    <div class="moduleName col-ff f-bold f-36">{{detail.name}}</div>
    <div class="module-info dis-flex flex-y-center">
      <div class="module-img">
        <img :src="detail.logo" class="bg-29 radius-16">
      </div>
      <div class="module-detail col-cc flex-1">
        <div class="name f-24 twoline-hidden">{{detail.summary}}</div>
        <div class="dis-flex flex-x-between code-point">
          <div class="f-24">自推佣金比例<i class="col-EE f-bold f-46 v-b">{{detail.commision_rate}}</i><i class="col-EE f-24 v-b">%</i></div>
          <div class="code-btn col-ff f-24"  @click="shareApp(appId)">
            <em class="dis-inline-block v-top iconfont iconerweima"></em>
            <div class="dis-inline-block v-top">下载推广码</div>
          </div>
        </div>
      </div>
    </div>
    <div class="earning bg-ff p-re radius-16">
      <div class="earning-head dis-flex flex-x-between col-10" @click="selectTime">
        <div class="f-bold f-32">个人收益</div>
        <div class="f-28">{{nowDate}}<i class="f-24 iconfont iconbottom"></i></div>
      </div>
      <div class="dis-flex flex-x-between flex-y-center">
        <div class="earning-predict">
          <div class="col-red f-44 num oneline-hidden">{{ecpmObj.todayEcpm}}</div>
          <div class="col-10 f-28 word">预估eCPM(元）</div>
        </div>
        <div class="yestoday">
          <div class="col-red f-44 num oneline-hidden">{{ecpmObj.yesterdayEcpmRes}}</div>
          <div class="col-10 f-28 word">昨日eCPM(元）</div>
        </div>
        <div class="setTime f-22">结算周期t+30日</div>
      </div>
    </div>

    <div class="tutorial bg-29" @click="goPlayway">
      <div class="tutorial-nav col-cc f-22 t-right">
        推广教程<i class="iconfont iconmore_home f-20"></i>
      </div>
      <img src="@/static/index/tutorial.png" alt="" class="tutorialImg">
    </div>

    <div class="slipe-box">
      <div class="slipe-item"></div>
      <div class="slipe-item"></div>
      <div class="slipe-item"></div>
    </div>

    <div class="m-b20 t-left col-14 f-bold f-36">更多推荐</div>
    <div class="game-box bg-29 radius-16">
      <appRow v-for="(item, index) in detail.moreList" :key="index" :item="item" @goDetail="goDetail(item)" @shareApp="shareApp(item.id)"></appRow>
    </div>

    <!-- 小程序二维码弹窗 -->
    <popup ref="popup">
      <template v-slot:default>
        <myCode :imgUrl="codeImgUrl"></myCode>
      </template>
    </popup>

    <!-- 时间选择弹窗 -->
    <popup ref="timePopup" type="bottom">
      <template v-slot:default>
        <div class="timeBox" @click.stop="">
          <van-datetime-picker v-model="currentDate" type="month-day" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="confirmTime" @cancel="cancel"/>
        </div>
      </template>
    </popup>
  </div>
</template>

<script>
import popup from '@/components/popup.vue'
import myCode from '@/views/components/code.vue'
import appRow from '@/views/components/appRow.vue'
import appAction from '@/mixin/appAction'
export default {
  mixins: [appAction],
  components: { popup, myCode, appRow },
  data () {
    return {
      appId: '',
      name: '详情',
      detail: '',
      menuList: [{
        iconUrl: require('@/static/index/menu1.png'),
        pathName: 'playWay'
      }, {
        iconUrl: require('@/static/index/menu2.png'),
        pathName: 'ranking'
      }, {
        iconUrl: require('@/static/index/menu3.png'),
        pathName: 'invite'
      }, {
        iconUrl: require('@/static/index/menu4.png')
      }, {
        iconUrl: require('@/static/index/menu5.png')
      }],
      // 时间选择
      nowDate: '', // 当前选中日期
      minDate: this.getMinDate(),
      maxDate: new Date(),
      currentDate: new Date(),
      timeSelectDef: 0, // 选中的日期距离今天的天数
      date: '', // 日期'2020-08-28',
      ecpmObj: '' // ecpm数据
    }
  },
  created () {
    this.appId = this.$route.query.id
    this.name = this.$route.query.name
    document.title = this.name
    this.getDetail(this.appId)
    this.getMinDate()
    this.getUserCount()
  },
  methods: {
    // 获取可选最小时间
    getMinDate () {
      // 获取当前日期
      var myDate = new Date()
      var nowY = myDate.getFullYear()
      var nowM = myDate.getMonth() < 9 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
      var nowD = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
      this.nowDate = nowM + '月' + nowD + '日'
      this.date = nowY + '-' + nowM + '-' + nowD
      var lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30) // 最后一个数字30可改，30天的意思
      return lw
    },
    async getDetail (id) {
      let that = this
      let res = await that.$request({ url: that.$api.appDetail, data: { id: id } })
      console.log('小程序详情res', res)
      that.detail = res
    },
    // 收益接口
    async getUserCount () {
      let that = this
      let data = {
        date: that.date
      }
      let res = await that.$request({ url: that.$api.ecpm, data: data })
      if (res) {
        console.log('自推订单收益', res)
        that.ecpmObj = res
      }
    },
    goPlayway () {
      this.$router.push({ name: 'playWay' })
    },
    selectTime () {
      this.$refs.timePopup.showPopup()
    },
    // 时间选择
    formatter (type, val) {
      if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      }
      return val
    },
    // 点击确认选择地址弹框
    confirmTime (val) {
      console.log('选中val', val)
      var nowY = val.getFullYear()
      var nowM = val.getMonth() < 9 ? '0' + (val.getMonth() + 1) : val.getMonth() + 1
      var nowD = val.getDate() < 10 ? '0' + val.getDate() : val.getDate()
      this.nowDate = nowM + '月' + nowD + '日'
      this.date = nowY + '-' + nowM + '-' + nowD
      var startDate = Date.parse(val)
      var endDate = Date.parse(new Date())
      var days = (endDate - startDate) / (24 * 60 * 60 * 1000)
      console.log(days)
      this.timeSelectDef = Math.floor(days)
      this.getUserCount()
      this.$refs.timePopup.hidePopup()
    },
    cancel () {
      this.$refs.timePopup.hidePopup()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
  .content{
    margin-top: 0;
    padding: 0 .3rem;
    width: 100%;
    box-sizing: border-box;
  }
</style>

