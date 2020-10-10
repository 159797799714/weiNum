<template>
  <div class="content">
    <div class="rank-banner bg-ff t-left">
      <div class="time f-26">更新时间：{{last_time}}</div>
    </div>
    <div class="tabs t-left">
      <div v-for="(item, index) in navList" :key="index" class="tab-item" :class="{actived: index === navIndex}" @click="navIndex = index">{{item.name}}</div>
    </div>
    <div class="rankList">
      <div v-if="rankList.length > 0">
        <div v-for="(item, index) in rankList" :key="index" class="rank-item dis-flex flex-x-between flex-y-center">
          <div class="rank-num t-center">
            <div v-if="index < 3" class="rank-img" :class="'rank'+index"></div>
            <i v-else class="col-ff f-30">{{index}}</i>
          </div>
          <div class="user flex-1 oneline-hidden col-cc f-24 t-left">
            <div class="dis-inline-block head-img v-top">
              <img :src="item.avatar" alt="" srcset="">
            </div>
            <i class="v-top">{{item.nickname}}</i>
          </div>
          <div class="sum" :class="{'col-EE f-34': index < 3}">
            <i class="f-24 f-400">赚</i> ￥{{getYuan(item.amount)}}
          </div>
        </div>
      </div>
      <div v-else class="blank col-99 f-30 t-center">暂无数据~</div>
    </div>

  </div>
</template>

<script>
import { getYuan } from '@/utils/util'
export default {
  data () {
    return {
      getYuan: getYuan,
      navList: [{
        name: '昨日收益'
      }, {
        name: '上周收益'
      }],
      navIndex: 0,
      last_time: '',
      rankList: []
    }
  },
  watch: {
    navIndex (val) {
      val += 1
      this.getRankList(val)
    }
  },
  created () {
    this.getRankList()
  },
  methods: {
    async getRankList (type = 1) {
      let that = this
      let res = await that.$request({ url: that.$api.rankList, data: { type: type } })
      if (res) {
        that.rankList = res.list
        that.last_time = res.last_time
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
  .rank0{background-image: url('../../static/index/rank1.png');}
  .rank1{background-image: url('../../static/index/rank2.png');}
  .rank2{background-image: url('../../static/index/rank3.png');}
</style>
