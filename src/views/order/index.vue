<template>
<loadMore :onLoadMore="loadMore" :enableLoadMore="enableLoadMore">
  <div class="content">
    <div class="filter dis-flex bg-10">
      <div v-for="(item, index) in filtList" :key="index" class="filt-item t-left flex-1" :class="{'col-14 f-32': index === selectIndex}" @click="selectFilter(index)">
        {{item.name}}
        <i class="iconfont dis-inline-block iconxiala f-right f-24 xiaIcon" :class="{selected: index === selectIndex}"></i>
      </div>
    </div>
    <!-- 抖音号，时间，小程序选择下拉框 -->
    <div v-show="selectIndex !== ''" class="filter-cover" @click="selectFilter(selectIndex)">
      <div class="bg-10 radius-b16 cover-box" ref="cover">
        <div v-if="selectIndex === 2" class="search" @click.stop="">
          <div class="search-box bg-29 dis-flex">
            <i class="iconfont iconsousuo col-ff f-28 souIcon"></i>
            <input type="text" v-model="searchVal" class="ipt flex-1 col-ff" ref="input">
            <i class="iconfont icondel f-40 col-99 delIcon" @click.stop="searchVal = ''"></i>
          </div>
        </div>
        <div v-if="List !== '' && List.length > 0" class="filter-list">
          <div v-for="(item, index) in List" :key="index" class="filter-item dis-flex flex-x-between flex-y-center" @click="selectItem(selectIndex, item)">
            <div class="filter-left t-left flex-1 oneline-hidden">
              <img v-if="selectIndex === 2" :src="item.logo" class="smallappImg bg-ff">
              <img v-else-if="selectIndex === 0" :src="item.avatar" class="douImg bg-ff">
              <div class="dis-inline-block v-top f-26 oneline-hidden"
                :class="(selectIndex === 0 && tiktokDefID === item.id) || (selectIndex === 1 && timeSelectDef === item.val) || (selectIndex === 2 && smallappSelectID === item.id) ? 'col-14': 'col-ff'">
                {{item.nickname || item.name}}
              </div>
            </div>
            <div class="filter-right">
              <i v-show="(selectIndex === 0 && tiktokDefID === item.id) || (selectIndex === 1 && timeSelectDef === item.val) || (selectIndex === 2 && smallappSelectID === item.id)" class="iconfont dis-inline-block v-center icongou col-14 f-40"></i>
            </div>
          </div>
        </div>
        <div v-else class="blank  t-center col-99 f-26 radius-b16">- 暂无搜索结果 -</div>
      </div>
    </div>

    <div class="grade bg-29 radius-16">
      <div v-for="(item, index) in gradeList" :key="index" class="grade-item flex-1">
        <div class="grade-name t-left col-14 f-32">{{item.name}}</div>
        <div class="dis-flex t-center">
          <div class="money flex-1 border-left">
            <div class="num col-EE f-44">{{item.amount}}</div>
            <div class="title col-99 f-24">预计佣金(元)</div>
          </div>
          <div class="money flex-1">
            <div class="num col-ff f-44">{{item.total_visitor_num}}</div>
            <div class="title col-99 f-24">访问人数</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="orderList && orderList.length > 0" class="t-left col-14 f-bold f-32 detail-title">详情</div>

    <div class="detailList t-left">
      <div v-for="(item, index) in orderList" :key="index" class="detail-item bg-ff radius-16" @click="goDetail({id: item.id, name: item.page_name})">
        <div class="item-head dis-flex flex-x-between col-99 f-24">
          <div>推广者：{{item.nickname}}</div>
          <div>{{item.create_time}}</div>
        </div>
        <div class="item-info dis-flex col-10">
          <img :src="item.page_logo" alt="" class="detail-img">
          <div class="flex-1 over-hidden">
            <div class="title-box dis-flex flex-y-center">
              <div class="item-title flex-1 v-top f-26 oneline-hidden opacity-8">{{item.page_name}}</div>
              <div class="item-time v-top f-22 opacity-8">{{item.settlement_time}}结算</div>
            </div>
            <div>
              <div class="people-num dis-inline-block f-24"><i class="opacity-6">实时访问 </i> <i class="f-bold col-10">{{item.visitor_num}}</i> <i class="opacity-8">人</i></div>
              <div class="get-money t-right dis-inline-block col-red f-28">赚 <i class="f-bold f-32">{{getYuan(item.my_commission_amount)}}</i> <i class="f-24 col-10">元</i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</loadMore>
</template>

<script>
import loadMore from '@/components/loadMore.vue'
import { getYuan } from '@/utils/util'
import appAction from '@/mixin/appAction'
export default {
  mixins: [appAction],
  title: '订单',
  components: { loadMore },
  data () {
    return {
      getYuan: getYuan,
      filtList: [{
        name: '抖音号'
      }, {
        name: '今天'
      }, {
        name: '小程序'
      }],
      gradeList: [{
        name: '自推',
        amount: '--',
        total_visitor_num: '--'
      }, {
        name: '团队',
        amount: '--',
        total_visitor_num: '--'
      }],
      searchVal: '', // 搜索框value值
      searchTimer: null,
      selectIndex: '',
      orderList: [],
      List: '', // 渲染出来的数组
      tiktokList: [], // 抖音号列表
      tiktokDefID: '',
      timeList: [{ // 时间列表
        nickname: '今天',
        val: 0
      }, {
        nickname: '昨天',
        val: 1
      }, {
        nickname: '近7天',
        val: 7
      }, {
        nickname: '近30天',
        val: 30
      }],
      timeSelectDef: 0,
      smallAppList: [],
      smallappSelectID: '',
      page: 1, // 订单列表页数
      enableLoadMore: true // 上拉加载更多
    }
  },
  watch: {
    selectIndex: {
      handler (val, oldVal) {
        if (val === '') return
        console.log(val)
        var that = this
        that.List = []
        switch (val) {
          case 0:
            that.List = that.tiktokList
            that.getTiktokList()
            break
          case 1:
            that.List = that.timeList
            break
          case 2:
            that.List = that.smallAppList
            that.getAppList()
            break
        }
      },
      immediate: true
    },
    searchVal (val, oldVal) {
      let that = this
      if (that.searchTimer) {
        return
      }
      clearTimeout(that.searchTimer)
      that.searchTimer = null
      that.searchTimer = setTimeout(function() {
        that.getAppList()
        clearTimeout(that.searchTimer)
        that.searchTimer = null
      }, 800)
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    refresh () {
      this.getUserCount()
      this.getTeamCount()
      this.getOrderList()
    },
    // 展开/收起顶部分类
    selectFilter (index) {
      this.selectIndex = this.selectIndex === index ? '' : index
      this.page = this.selectIndex === index ? 1 : this.page
    },
    // 切换分类下的条件,抖音号，时间，小程序
    selectItem (selectIndex, item) {
      var that = this
      that.page = 1
      switch (selectIndex) {
        case 0:
          that.tiktokDefID = item.id
          break
        case 1:
          that.timeSelectDef = item.val
          that.filtList[1].name = item.nickname
          break
        case 2:
          that.smallappSelectID = item.id
          break
      }
      that.refresh()
    },
    // 绑定的抖音账号
    async getTiktokList () {
      let that = this
      let res = await that.$request({ url: that.$api.tiktokList })
      // let data = {
      //   page: '',
      //   page_size: '',
      //   keyword: that.searchVal
      // }
      // let res = await that.$request({ url: that.$api.tikUsers, data: data })
      if (!res) {
        res = []
      }
      that.tiktokList = res
      that.List = res
    },
    // 小程序列表
    async getAppList () {
      let that = this
      let data = {
        page: '',
        page_size: '',
        keyword: that.searchVal
      }
      let res = await that.$request({ url: that.$api.appletSearch, data: data })
      console.log('小程序列表', res)
      if (!res) {
        res = []
      }
      that.smallAppList = res
      this.List = res
    },
    filterResCount (res, index) {
      let that = this
      res.amount = getYuan(res.amount)
      that.gradeList[index].amount = res.amount
      that.gradeList[index].total_visitor_num = index > 0 ? res.total_visitor_num : res.TotalVisitorNum
    },
    async getUserCount () {
      let that = this
      let data = {
        tik_uid: that.tiktokDefID,
        day_num: that.timeSelectDef,
        page_id: that.smallappSelectID
      }
      let res = await that.$request({ url: that.$api.userCount, data: data })
      if (res) {
        console.log('自推订单收益', res)
        that.filterResCount(res, 0)
      }
    },
    async getTeamCount () {
      let that = this
      let data = {
        day_num: that.timeSelectDef
      }
      let res = await that.$request({ url: that.$api.teamCount, data: data })
      if (res) {
        console.log('团队订单收益', res)
        that.filterResCount(res, 1)
      }
    },
    loadMore (done) {
      let that = this
      setTimeout(() => {
        if (!that.enableLoadMore) {
          return
        }
        that.getOrderList(true, done)
      }, 200)
    },
    async getOrderList (loadMore = null, done = null) {
      console.log('接收到loadMore', loadMore)
      let that = this
      let oldpage = that.page
      let data = {
        page: loadMore ? that.page + 1 : that.page,
        page_size: 10,
        tik_uid: that.tiktokDefID,
        day_num: that.timeSelectDef,
        page_id: that.smallappSelectID
      }
      let res = await that.$request({ url: that.$api.orders, data: data })
      // let res = require('./mock.json')

      if (res && res.length > 0) {
        var more = loadMore ? done() : ''
        res.forEach((item, index) => {
          item.commission_amount = getYuan(item.commission_amount)
          item.my_commission_amount = getYuan(item.my_commission_amount)
        })
        res.forEach((item) => {
          var day = 1000 * 60 * 60 * 24
          let nowDate = new Date()
          let myDate = new Date(item.create_time)

          var disDay = Math.floor((nowDate - myDate) / day)
          console.log(item.create_time, nowDate, myDate, disDay)

          switch (disDay) {
            case 0:
              item.create_time = '今天'
              break
            case 1:
              item.create_time = '昨天'
              break
            case 2:
              item.create_time = '前天'
              break
            default:
              item.create_time = myDate.getMonth() + 1 + '月' + myDate.getDate() + '日'
              break
          }
          let settlement_time = new Date(item.settlement_time)
          var settleM = settlement_time.getMonth() + 1
          var settleD = settlement_time.getDate()
          item.settlement_time = settleM + '月' + settleD + '日'
        })
        that.orderList = loadMore ? that.orderList.concat(res) : res
      } else {
        that.page = 1
        var more = loadMore ? done('没有更多数据') : ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>

