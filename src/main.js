import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from './components/toast'
import Loading from './components/loading'
import api from './api/api'
import 'vant/lib/index.css'

import request from './utils/request'

import '@/common/common.scss'
import '@/common/iconfont.css'

import { Swipe, SwipeItem, DatetimePicker, PullRefresh } from 'vant'

Vue.use(Toast)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Loading)
Vue.use(DatetimePicker)
Vue.use(PullRefresh)

Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$request = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

