<template>
  <div class="game-item dis-flex flex-x-betindexween flex-y-center" @click="goDetail(item)">
    <div class="game-img">
      <img :src="item.logo" >
    </div>
    <div class="game-center flex-1 over-hidden t-left">
      <div class="game-name f-bold f-28 oneline-hidden col-ff">{{item.name}}</div>
      <div class="game-info oneline-hidden col-cc f-24 oneline-hidden">{{item.summary}}</div>
    </div>
    <div class="shareBtn t-right col-EE f-bold f-32"  @click.stop="shareApp(item)">推广</div>
  </div>
</template>

<script>
export default {
  name: 'appRow',
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {}
  },
  methods: {
    goDetail (item) {
      this.$emit('goDetail', item)
    },
    shareApp (item) {
      this.$emit('shareApp', item)
    }
  }
}
</script>

<style lang="scss" scopde>
  .game-item{
    padding-bottom: .4rem;
    .game-img{
      margin-right: .2rem;
      height: .88rem;
      width: .88rem;
      &>img{
        height: 100%;
        width: 100%;
        border-radius: .1rem;
      }
    }
    .game-center{
      .game-name{
        z-index: 1;
        margin-bottom: .08rem;
        line-height: .36rem;
      }
      .game-info{
        line-height: .33rem;
      }
    }
    .shareBtn{
      width: 1.3rem;
    }
  }
</style>
