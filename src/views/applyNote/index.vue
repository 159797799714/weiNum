<template>
  <div class="content f-26">
    <div class="row col-ff">
      <div class="row-left t-left">提现时间</div>
      <div class="row-center t-right">金额</div>
      <div class="row-right t-right">预计到账时间</div>
    </div>
    <div  v-if="rowList && rowList.length > 0">
      <div v-for="(item, index) in rowList" :key="index" class="rowList col-cc">
        <div class="row-left t-left">{{item.create_time}}</div>
        <div class="row-center t-right">{{getYuan(item.amount)}}元</div>
        <div class="row-right t-right">xx.xx.xx前(假数据)</div>
      </div>
    </div>
    <div v-else class="blank">
      <img src="@/static/mine/applykong.png" class="blankImg">
      <div class="t-center col-cc f-26">- 暂无提现记录 -</div>
    </div>

  </div>
</template>

<script>
import { getYuan } from '@/utils/util'
export default {
  data () {
    return {
      rowList: '',
      getYuan: getYuan
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      let that = this
      let data = {
        page: 1,
        page_size: 10
      }
      let res = await that.$request({ url: that.$api.cashflows, data: data })
      if (res) {
        res.map((item, index) => {
          let time = new Date(item.create_time)
          let y = time.getFullYear()
          let m = time.getMonth() + 1
          let d = time.getDay()
          let h = time.getHours()
          let min = time.getMinutes()
          let s = time.getSeconds()
          item.create_time = `${y}.${m}.${d} ${h}:${min}:${s}`
        })
        that.rowList = res
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
