<template>
  <transition name="fade">
    <div v-show="visible" class="loading t-center">
      <div class="loading-img dis-inline-block">
        <img src="@/static/loading.png" class="img">
      </div>
      <div class="loadingMsg">{{message}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      message: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  z-index: 1000000000000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: .2rem .44rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;
  line-height: .36rem;
  font-size: .26rem;
  border-radius: .08rem;
  .loading-img{
    margin-bottom: .2rem;
    height: 0.7rem;
    width: 0.7rem;
    border-radius: 100%;
    overflow: hidden;
    .img{
      height: 100%;
      width: 100%;
      animation: loading 3s infinite ;
    }
  }
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/* vue动画过渡效果设置 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
