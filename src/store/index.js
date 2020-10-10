import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/api/api'
import request from '@/utils/request'
import getCodeUrl from '@/utils/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabName: 'index',
    title: '',
    token: localStorage.token,
    openid: localStorage.openid,
    code: localStorage.code
  },
  mutations: {
    // 登录
    setToken (state, data) {
      console.log('触发了setToken', data)
      state.token = data.token
      state.openid = data.openid
    },
    setCode (state, code) {
      code = code ? code : ''
      state.code = code
      localStorage.setItem('code', code)
    },
    // 退出登录
    loginOut (state) {
      state.token = ''
      state.openid = ''
      state.code = ''
      localStorage.clear()
      sessionStorage.clear()
    },
    // 设置底部三大tab选中路由名字
    setTabName (state, tabName) {
      state.tabName = tabName
    },
    // 设置标题名称
    setTitle (state, title) {
      document.title = title
      state.title = title
    }
  },
  actions: {
    async loginIn ({ commit }, code) {
      let data = {
        code: code,
        token: '',
        openid: ''
      }
      console.log('触发了action的loginIn', code)
      commit('setCode', code)
      // code换取token以及openid
      let res = await request({ url: API.getToken, data: { code: code } })
      if (res) {
        console.log('loginIn里面res.data.token', res.token)
        data.token = res.token
        data.openid = res.user.openid
        localStorage.setItem('token', data.token)
        localStorage.setItem('oppenid', data.openid)
        commit('setToken', data)
      } else {
        // alert('获取token失败')
        console.log('获取token失败')
        getCodeUrl()
      }
    }
  },
  modules: {
  }
})

