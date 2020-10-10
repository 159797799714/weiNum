<template>
  <div class="BigContent">
    <div class="center-main">
      <router-view></router-view>
    </div>
    <div class="footerNav">
      <div v-for="(item, index) in tabList" :key="index" :class="{navLi: true, 'col-ff': item.name === selectName}" @click="clickFooter(item.name)">
        <img :src="item.name == selectName?item.iconUrl2: item.iconUrl" alt="">
        <h3> {{ item.title}} </h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabList: [
        {
          title: '首页',
          name: 'index',
          iconUrl: require('@/static/tabs/index-1.png'),
          iconUrl2: require('@/static/tabs/index-2.png')
        }, {
          title: '订单',
          name: 'order',
          iconUrl: require('@/static/tabs/order-1.png'),
          iconUrl2: require('@/static/tabs/order-2.png')
        }, {
          title: '我的',
          name: 'mine',
          iconUrl: require('@/static/tabs/mine-1.png'),
          iconUrl2: require('@/static/tabs/mine-2.png')
        }
      ]
    }
  },
  computed: {
    selectName: function () {
      return this.$store.state.tabName
    }
  },
  methods: {
    clickFooter (name) {
      if (this.selectName !== name) {
        this.$router.push({ name: name })
        this.$store.commit('setTabName', name)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.BigContent{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .center-main{
    flex: 1;
    overflow: auto;
    color: #fff;
  }
  .footerNav{
    display: flex;
    width: 100%;
    height: .98rem;
    background: #0B1C35;
    box-shadow: 0 -0.01rem 0.06rem 0 rgba(5,5,53,0.44);
    .navLi{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: rgba(255,255,255, 0.4);
      &>img{
        height: .52rem;
        width: .52rem;
        margin-bottom: .04rem;
      }
      &>h3{
        font-size: .22rem;
      }
    }
  }
  .selected{
    color: #ffffff!important;
  }
}
</style>
