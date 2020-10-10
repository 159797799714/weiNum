<template>
  <div class="content col-ff">
    <!-- 趣味游戏列表 -->
    <div class="module-box">
      <div class="module-item">
        <div class="module-title">
          <div class="list-name f-bold col-14 f-36">{{ModuleName}}</div>
        </div>
        <!-- 小程序大展示区 -->
        <div v-if="menuList.length > 0" class="module-banner p-re" @click="goDetail(menuList[0])">
          <div class="code-row dis-flex flex-x-between">
            <div class="type-name f-bold col-ff f-36">{{menuList[0].name}}</div>
            <div class="code-btn col-82 f-24" @click.stop="shareApp(menuList[0].id)">
              <em class="dis-inline-block v-top iconfont iconerweima"></em>
              <div class="dis-inline-block v-top">下载推广码</div>
            </div>
          </div>
          <div class="module-info dis-flex flex-x-between flex-y-center">
            <div class="module-img">
              <img src="@/static/tabs/index-2.png">
            </div>
            <div class="flex-1 t-left">
              <div class="module-word f-24 col-cc oneline-hidden">{{menuList[0].summary}}</div>
              <div class="f-22 grade-info v-b col-cc">
                昨日最高收益<i class="col-yellow f-30 f-bold dis-inline-block v-b">{{menuList[0].yesterday_income}}</i>元<i class="line f-26">|</i>自推比例 <i class="f-bold">{{menuList[0].commision_rate}}</i>%
              </div>
            </div>
          </div>
        </div>
        <!-- 小展示 -->
        <div v-if="menuList.length > 1" class="game-box">
          <div v-for="(item, index) in menuList" :key="index">
            <appRow v-if="index > 0" :item="item" @goDetail="goDetail" @shareApp="shareApp(item.id)"></appRow>
          </div>
        </div>
      </div>
      <div v-if="menuList2 && menuList2.length > 0" class="module-item">
        <div class="module-title">
          <div class="list-name f-bold col-14 f-36">喜欢这类产品的人还在看</div>
        </div>
        <div class="gameMore-box radius-16">
          <appRow v-for="(item, index) in menuList2" :key="index" :item="item" @goDetail="goDetail" @shareApp="shareApp(item.id)"></appRow>
        </div>
      </div>
    </div>

    <!-- 小程序二维码弹窗 -->
    <popup ref="popup">
      <template v-slot:default>
        <mycode :imgUrl="codeImgUrl"></mycode>
      </template>
    </popup>
  </div>
</template>

<script>
import popup from '@/components/popup.vue'
import mycode from '@/views/components/code.vue'
import appRow from '@/views/components/appRow.vue'
import appAction from '@/mixin/appAction'
export default {
  mixins: [appAction],
  title: '订单',
  components: { popup, mycode, appRow },
  data () {
    return {
      ModuleName: '', // 模块名称
      menuList: [],
      menuList2: []
    }
  },
  watch: {
    selectIndex: {
      handler (val, oldVal) {
        if (val === '') return
        console.log(val)
        var that = this
        switch (val) {
          case 0:
            that.List = that.douList
            break
          case 1:
            that.List = that.timeList
            break
          case 2:
            that.List = that.smallAppList
            break
        }
      },
      immediate: true
    }
  },
  created () {
    console.log(this.$route)
    let moduleId = this.$route.query.id
    this.ModuleName = this.$route.query.ModuleName
    this.getApplist(moduleId)
  },
  methods: {
    // 小程序列表
    async getApplist (moduleId, pageData) {
      let that = this
      pageData = pageData ? pageData: { page: 1, page_size: 10 }
      let data = { moduleId: moduleId, ...pageData }
      var res = await that.$request({ url: this.$api.appletList, data: data })
      console.log('小程序列表res', res)
      that.menuList = res
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
