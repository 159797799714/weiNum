import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout.vue'
import store from '@/store'
import { getUrlCode } from '@/utils/util'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/index'
    },
    {
      path: '/index',
      component: Layout,
      children: [{
        path: '/',
        name: 'index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页'
        }
      }]
    },
    {
      path: '/order',
      component: Layout,
      children: [{
        path: '/',
        name: 'order',
        component: () => import('@/views/order/index.vue'),
        meta: {
          title: '订单'
        }
      }]
    },
    {
      path: '/mine',
      component: Layout,
      children: [{
        path: '/',
        name: 'mine',
        component: () => import('@/views/mine/index.vue'),
        meta: {
          title: '我的'
        }
      }]
    },
    {
      path: '/playWay',
      name: 'playWay',
      component: () => import('@/views/playWay/index.vue'),
      meta: {
        title: '玩法介绍'
      }
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('@/views/ranking/index.vue'),
      meta: {
        title: '单王排行榜'
      }
    },
    {
      path: '/moreApp',
      name: 'moreApp',
      component: () => import('@/views/moreApp/index.vue'),
      meta: {
        title: '查看更多'
      }
    },
    {
      path: '/myteam',
      name: 'myteam',
      component: () => import('@/views/myteam/index.vue'),
      meta: {
        title: '我的团队'
      }
    },
    {
      path: '/applyNote',
      name: 'applyNote',
      component: () => import('@/views/applyNote/index.vue'),
      meta: {
        title: '提现记录'
      }
    },
    {
      path: '/mytiktok',
      name: 'mytiktok',
      component: () => import('@/views/mytiktok/index.vue'),
      meta: {
        title: '我的抖音号'
      }
    },
    {
      path: '/invite',
      name: 'invite',
      component: () => import('@/views/invite/index.vue'),
      meta: {
        title: '邀请好友'
      }
    },
    {
      path: '/moduleDetail',
      name: 'moduleDetail',
      component: () => import('@/views/moduleDetail/index.vue'),
      meta: {
        title: '详情'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/login/register.vue'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('@/views/login/forget.vue'),
      meta: {
        title: '忘记密码'
      }
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404.vue'),
      meta: {
        title: '404'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('路由守卫触发', from, to)
  /* 路由发生变化修改页面title */
  let title= to.meta.title ? to.meta.title : ''
  const whiteList = ['index', 'order', 'mine']
  document.title = title
  if (whiteList.indexOf(to.name) !== -1) {
    store.commit('setTabName', to.name)
  }
  // 获取url的参数obj, obj.code为授权code
  // let code = getUrlCode()
  // console.log('code，路由里面的code', code)
  // if (code) store.dispatch('loginIn', code)

  next()
  //   // main.js
  // router.afterEach((to, from) => {
  //   let _url = window.location.origin + to.fullPath
  //   // 非ios设备，切换路由时候进行重新签名
  //   if (window.__wxjs_is_wkwebview !== true) {
  //     request.get('/api/jssdk?url=' + encodeURIComponent(_url)).then(function (_lists) {
  //       // 注入配置
  //       wx.config({
  //         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //         appId: 'wxd92293402f73f76f', // 必填，公众号的唯一标识
  //         timestamp: '', // 必填，生成签名的时间戳
  //         nonceStr: '', // 必填，生成签名的随机串
  //         signature: '',// 必填，签名
  //         jsApiList: [] // 必填，需要使用的JS接口列表
  //       });
  //     })
  //   }
  //   // 微信分享配置
  //   wx.ready(function () {
  //     wx.onMenuShareTimeline({
  //      ...
  //     })
  //   })
  // })

  // ios 设备进入页面则进行js-sdk签名
  // if (window.__wxjs_is_wkwebview === true) {
  //   let _url = window.location.href.split('#')[0]
  //   request.get('/api/jssdk?url=' + encodeURIComponent(_url)).then(function (res) {
  //     let _lists = res
  //     wx.config({
  //       debug: false,
  //       appId: _lists.appId,
  //       timestamp: _lists.timestamp,
  //       nonceStr: _lists.nonceStr,
  //       signature: _lists.signature,
  //       jsApiList: ['chooseImage', 'uploadImage', 'previewImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay']
  //     })
  //   })
  // }
})

export default router
