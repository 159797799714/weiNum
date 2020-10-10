<template>
  <div class="content">
    <div class="teamGrade radius-16">
      <div class="grade-left t-left">
        <div class="grade-item item-one">
          <div class="num col-14 f-bold f-36">5</div>
          <div class="gradeName col-99 f-22">一级邀请(人)</div>
        </div>
        <div class="grade-item">
          <div class="num col-14 f-bold f-36">500</div>
          <div class="gradeName col-99 f-22">已获得答谢金(元)</div>
        </div>
      </div>
      <div class="grade-right">
        <div class="grade-item">
          <div class="num col-14 f-bold f-36">2</div>
          <div class="gradeName col-99 f-22">二级邀请(人)</div>
        </div>
        <div class="grade-item">
          <div class="num col-14 f-bold f-36">200</div>
          <div class="gradeName col-99 f-22">已获得答谢金(元)</div>
        </div>
      </div>
    </div>
    <div class="tabs t-left">
      <div v-for="(item, index) in navList" :key="index" class="tab-item" :class="{actived: index === navIndex}" @click="navIndex = index">{{item.name}}</div>
    </div>
    <div  v-if="rankList && rankList.length > 0" class="rankList">
      <div v-for="(item, index) in rankList" :key="index" class="rank-item dis-flex flex-x-between flex-y-center f-26">
        <div class="user flex-1 oneline-hidden col-cc t-left">
          <div class="dis-inline-block head-img v-top">
            <img src="@/static/tabs/order-1.png" alt="" srcset="">
          </div>
          <div class="userName dis-inline-block v-top oneline-hidden">{{item.name}}</div>
        </div>
        <div v-show="navIndex === 1" class="inviteMan t-right col-ff">
          <div class="dis-inline-block v-top name oneline-hidden">刘秀慧刘秀慧刘秀慧</div>邀请
        </div>
        <div class="sum t-right col-ff oneline-hidden">已获 {{item.sum}}元</div>
      </div>
    </div>
    <div v-else class="blank">
      <img src="@/static/mine/invitekong.png" class="inviteKong">
      <div class="col-cc f-26">暂无邀请好友，快去邀请吧</div>
    </div>

    <div class="footBox t-center">
      <div class="floatBtn dis-inline-block col-ff f-30">邀请好友规则 <i class="iconfont iconwenhao"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [{
        name: '一级邀请'
      }, {
        name: '二级邀请'
      }],
      navIndex: 0,
      rankList: ''
      // [{
      //   name: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
      //   sum: 95,
      //   imgUrl: require('@/static/tabs/index-1.png')
      // }, {
      //   name: '哈哈哈',
      //   sum: 931,
      //   imgUrl: require('@/static/tabs/index-1.png')
      // }, {
      //   name: '嘻嘻嘻',
      //   sum: 11,
      //   imgUrl: require('@/static/tabs/index-1.png')
      // }, {
      //   name: '嘻嘻嘻',
      //   sum: 1195.90,
      //   imgUrl: require('@/static/tabs/index-1.png')
      // }]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      let that = this
      let res = await that.$request({ url: that.$api.teamList })
      console.log('我的团队列表', res)
    }
  },
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
