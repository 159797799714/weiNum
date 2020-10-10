<template>
  <div class="content">
    <div class="tabs t-left">
      <div v-for="(item, index) in navList" :key="index" class="tab-item" :class="{actived: index === navIndex}" @click="navIndex = index">{{item.name}}</div>
    </div>
    <div class="tiktokList">
      <div class="listSum t-center bg-10 col-cc f-24">共{{tiktokList.length}}个账号</div>
      <div v-for="(item, index) in tiktokList" :key="index" class="rank-item dis-flex flex-x-between flex-y-center f-26">
        <div class="user flex-1 oneline-hidden col-ff t-left">
          <div class="dis-inline-block head-img v-top">
            <img src="@/static/tabs/order-1.png" alt="" srcset="">
          </div>
          <div class="userName dis-inline-block v-top oneline-hidden">{{item.name}}</div>
        </div>
      </div>
    </div>

    <!-- <div class="footBox t-center">
      <div class="floatBtn dis-inline-block col-ff f-30">邀请好友规则 <i class="iconfont iconwenhao"></i></div>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [{
        name: '新抖音号'
      }, {
        name: '旧抖音号'
      }],
      navIndex: 0,
      tiktokList: []
    }
  },
  watch: {
    navIndex (val) {
      this.getTiktokList(val + 1)
    }
  },
  created () {
    this.getTiktokList(1)
  },
  methods: {
    // 绑定的抖音账号
    async getTiktokList (type = 1) {
      let that = this
      let data = {
        page: '',
        page_size: '',
        type: type
      }
      let res = await that.$request({ url: that.$api.tiktokList, data })
      // let data = {
      //   page: '',
      //   page_size: '',
      //   keyword: that.searchVal
      // }
      // let res = await that.$request({ url: that.$api.tikUsers, data: data })
      if (res) {
        that.tiktokList = res
      }
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
