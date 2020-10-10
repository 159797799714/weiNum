<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <div class="content">
    <div class="header t-left">
      <div class="head-left dis-inline-block v-top">
        <img :src="userInfo.avatar" class="head-img dis-inline-block v-center">
        <div class="user-info dis-inline-block v-center">
          <div class="name f-bold col-cc f-34 oneline-hidden">{{userInfo.nickname? userInfo.nickname: '暂无昵称~'}}</div>
          <div class="info col-99 f-24" @click="userPopup">账户信息
            <i class="iconfont iconmore_home f-24"></i>
          </div>
        </div>
      </div>
      <div class="head-right f-right" @click="receiveOpen">
        <div class="f-24 col-ff">
          <i class="iconfont iconbianji f-24"></i>收款信息
        </div>
      </div>
    </div>
    <div class="grade-menu dis-flex">
      <div v-for="(item, index) in gradeList" :key="index" class="menu-item flex-1">
        <div class="money f-bold col-14 f-36">{{item.money}}</div>
        <div class="name col-cc f-24">{{item.name}}</div>
      </div>
    </div>
    <div class="balance t-left bg-ff col-10 radius-16">
      <div class="f-30 line-36">可提现金额</div>
      <div class="dis-flex flex-x-between">
        <div class="balance-num f-bold f-28 v-b">￥<i class="f-56">{{userInfo.balance}}</i></div>
        <div class="supplyBtn t-center col-ff f-28" @click="applyPopup">提现</div>
      </div>
      <div class="aroundGrade col-10 f-24">近30天收益 ￥{{userInfo.day_30_amount}}</div>
    </div>

    <div class="nav-menu t-left">
      <div v-for="(item, index) in navList" :key="index" class="nav-item dis-inline-block t-center" @click="clickNav(item)">
        <img :src="item.iconUrl" class="nav-icon dis-inline-block">
        <div class="col-cc f-24 nowrap">{{item.name}}</div>
      </div>
    </div>

    <!-- <div class="foot t-center">
      <div class="foot-btn dis-inline-block t-center col-82 f-28" @click="goInvite">邀请好友短视频变现</div>
    </div> -->

    <!-- 收款信息弹窗 -->
    <popup ref="receivePopup" :isModel="true" @submitAction="receiveSubmit" @cancelAction="receiveCancel">
      <div class="receive-main t-left">
        <div class="title col-10 f-bold f-32">收款信息编辑</div>
        <div class="receive-title f-26">真实姓名</div>
        <div class="ipt-box">
          <input type="text" v-model="receiveForm.truename" class="ipt" maxlength="8" :class="isRecive && !receiveForm.truename?'error-box':''">
        </div>
        <div class="errorWord col-red f-20">{{isRecive && !receiveForm.truename?'* 请填写真实姓名': ''}}</div>

        <div class="receive-title f-26">身份证号</div>
        <div class="ipt-box">
          <input type="text" v-model="receiveForm.id_num" class="ipt"  maxlength="18" :class="isRecive && !receiveForm.id_num?'error-box':''">
        </div>
        <div class="errorWord col-red f-20">{{isRecive && !receiveForm.id_num?'* 请填写身份证号': ''}}</div>

        <div class="receive-title f-26">银行卡号</div>
        <div class="ipt-box">
          <input type="number" v-model="receiveForm.bank_num" class="ipt"  maxlength="18" :class="isRecive && !receiveForm.bank_num?'error-box':''">
        </div>
        <div class="errorWord col-red f-20">{{isRecive && !receiveForm.bank_num?'* 请填写银行卡号': ''}}</div>

        <div class="receive-title f-26">手机号</div>
        <div class="ipt-box">
          <input type="number" v-model="receiveForm.bank_phone" class="ipt" maxlength="11" :class="isRecive && !receiveForm.bank_phone?'error-box':''">
        </div>
        <div class="errorWord col-red f-20">{{isRecive && !receiveForm.bank_phone?'* 请输入正确的手机号码': ''}}</div>
      </div>
    </popup>

    <!-- 账号信息编辑弹窗 -->
    <popup ref="userPopup" :isModel="true" @submitAction="userSubmit()" @cancelAction="userCancel">
      <div class="receive-main t-left">
        <div class="title col-10 f-bold f-32">账号信息编辑</div>
        <div class="receive-title f-26">微信号</div>
        <div class="ipt-box">
          <input type="text" v-model="userForm.wechat_account" class="ipt" maxlength="20" :class="isUser && !userForm.wechat_account?'error-box':''">
        </div>
        <div class="errorWord col-red f-20">{{isUser && !userForm.wechat_account?'* 请填写微信号': ''}}</div>

        <div class="receive-title f-26">手机号</div>
        <div class="ipt-box">
          <input type="number" v-model="userForm.phone" class="ipt" maxlength="11" :class="isUser && !userForm.phone?'error-box':''">
        </div>
        <div class="errorWord col-red f-20">{{isUser && !userForm.phone?'* 请输入正确的手机号码': ''}}</div>
      </div>
    </popup>

    <!-- 提现弹窗 -->
    <popup ref="applyPopup" @cancelAction="applyStatus = 1">
      <div class="receive-main t-left over-hidden">
        <div class="title col-10 f-bold f-32">提现到账户</div>
        <!-- 弹窗样式1 -->
        <div v-if="applyStatus === 1">
          <div class="apply-info">
            <div class="info-item f-22">首次提现1元起提，后续10元起提。</div>
            <div class="info-item f-22">提现周期 T+30，如：8月1日收益8月31日提，8月2日收益9月1日提</div>
            <div class="info-item f-22">下午6点前提现当日到账，下午6点后提现次日到账</div>
          </div>
          <div class="applyList dis-flex flex-x-between">
            <div v-for="(item, index) in applyList" :key="index" class="apply-item t-center col-10">
              <div class="money f-32" :class="{'col-14 f-bold': index === 0}">{{item.money}}</div>
              <div class="name f-24">{{item.name}}</div>
            </div>
          </div>
          <div class="sureBtn t-center col-ff f-28" @click="applySubmit">确定</div> 
        </div>
        <!-- 失败 -->
        <div v-else class="failBox t-center col-14 f-60 over-hidden">
          <div class="iconfont dis-inline-block icondel failIcon"></div>
          <div class="shadow"></div>
          <div class="f-28 word col-10">申请失败</div>
          <div class="f-28 word col-10">{{applyError}}</div>
        </div>
      </div>
    </popup>

     <!-- 商务合作弹窗 -->
    <popup ref="workPopup">
      <template v-slot:default>
        <div class="group-main t-center dis-flex flex-column flex-x-center">
          <div class="group-banner bg-29"></div>
          <img src="" class="group-code dis-inline-block bg-29">
          <div class="f-26 col-10 line-34">长按识别二维码联系商务经理</div>
          <img src="@/static/index/hand.png" alt="" class="hand-icon">
        </div>
      </template>
    </popup>

    <!-- 联系客服弹窗 -->
    <popup ref="kfPopup">
      <div class="group-main t-center dis-flex flex-column flex-x-center">
        <div class="title t-left col-10 f-bold f-32">联系客服</div>
        <img src="" class="group-code dis-inline-block bg-29">
        <div class="f-26 col-10 line-34">长按识别二维码联系客服经理</div>
        <img src="@/static/index/hand.png" alt="" class="hand-icon">
      </div>
    </popup>

  </div>
</van-pull-refresh>
</template>

<script>
import popup from '@/components/popup.vue'
import { getYuan } from '@/utils/util'
export default {
  title: '个人中心',
  components: {
    popup: popup
  },
  data () {
    return {
      isLoading: false,
      userInfo: {
        nickname: '',
        day_30_amount: '0.00',
        balance: '0.00'
      },
      gradeList: [{
        money: '0.00',
        name: '今日收益预估(元)'
      }, {
        money: '0.00',
        name: '昨日收益(元)'
      }, {
        money: '0.00',
        name: '累计收益(元)'
      }],
      navList: [
      //   {
      //   iconUrl: require('@/static/mine/icon_team.png'),
      //   name: '我的团队',
      //   pathName: 'myteam'
      // }, 
      {
        iconUrl: require('@/static/mine/icon_dy.png'),
        name: '我的抖音号',
        pathName: 'mytiktok'
      }, {
        iconUrl: require('@/static/mine/icon_tx.png'),
        name: '提现记录',
        pathName: 'applyNote'
      }, {
        iconUrl: require('@/static/mine/icon_kf.png'),
        name: '咨询客服'
      }, {
        iconUrl: require('@/static/mine/icon_hz.png'),
        name: '商务合作'
      }, {
        iconUrl: require('@/static/mine/icon_jc.png'),
        name: '新手教程',
        pathName: 'playWay'
      }, {
        iconUrl: require('@/static/mine/icon_clear.png'),
        name: '清除缓存'
      }],
      // 收款信息
      receiveForm: {
        truename: '',
        id_num: '',
        bank_num: '',
        bank_phone: ''
      },
      isRecive: false, // 是否点击确认提交收款信息
      // 账户信息
      userForm: {
        wechat_account: '',
        phone: ''
      },
      isUser: false, // 是否点击确认提交账户信息
      applyList: [{
        money: '0.00',
        name: '可提现余额(元)'
      }, {
        money: '0.00',
        name: '总余额(元)'
      }, {
        money: '0.00',
        name: '近30天收益(元)'
      }],
      applyStatus: 1, // 1代表提现弹窗1样式1， 不为1为提现失败状态样式2,
      applyError: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    clickNav (item) {
      var that = this
      if (item.pathName) {
        that.$router.push({ name: item.pathName })
      } else {
        switch (item.name) {
          case '商务合作':
            that.$refs.workPopup.showPopup()
            break
          case '咨询客服':
            that.$refs.kfPopup.showPopup()
            break
          case '清除缓存':
            that.$store.commit('loginOut')
            that.$toast('清除缓存成功')
            break
          default:
            break
        }
      }
    },
    // 下拉刷新
    async onRefresh () {
      let that = this
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
      let res = await that.$request({ url: that.$api.userInfo })
      if (res) {
        that.$toast('刷新成功')
      }
    },
    async getUserInfo () {
      let that = this
      let res = await that.$request({ url: that.$api.userInfo })
      console.log('获取到个人信息', res)
      if (res) {
        res.balance = getYuan(res.balance)
        res.day_30_amount = getYuan(res.day_30_amount)
        that.userInfo = res
        // 收益
        let gradeArr = that.gradeList
        let { today_amount, yesterday_amount, total_amount } = res
        console.log(today_amount, yesterday_amount, total_amount)
        let arr = [getYuan(today_amount), getYuan(yesterday_amount), getYuan(total_amount)]
        gradeArr.map((item, index) => {
          item.money = arr[index]
        })
        that.gradeArr = gradeArr
        // 提现 applyList
        let applyList = that.applyList
        let arr2 = [res.balance, getYuan(res.total_balance), res.day_30_amount]
        applyList.map((item, index) => {
          item.money = arr2[index]
        })
        that.applyList = applyList
        // 收款信息
        let { truename, id_num, bank_num, bank_phone } = res
        that.receiveForm = { truename, id_num, bank_num, bank_phone }
        // 账户信息
        let { wechat_account, phone } = res
        that.userForm = { wechat_account, phone }
      }
    },
    goInvite () {
      this.$router.push({ name: 'invite' })
    },
    // 打开收款信息弹窗
    receiveOpen () {
      this.$refs.receivePopup.showPopup()
    },
    // 提交收款信息
    async receiveSubmit () {
      let that = this
      console.log('点击了账户信息确定按钮')
      this.isRecive = true
      let data = {
        truename: that.receiveForm.truename,
        id_num: that.receiveForm.id_num,
        bank_num: that.receiveForm.bank_num,
        bank_phone: that.receiveForm.bank_phone
      }
      console.log(that.filterNull(data))
      if (!that.filterNull(data)) {
        return
      }
      let res = await that.$request({ url: that.$api.payInfo, method: 'post', data: data }, true)
      if (res.code === 0) {
        that.$toast(res.msg)
        that.getUserInfo()
        that.$refs.receivePopup.hidePopup()
      }
    },
    // 取消收款信息
    receiveCancel () {
      console.log('点击了收款信息取消')
      this.isRecive = false
      this.setObjDef('receiveForm')
    },
    // 打开账户信息弹窗
    userPopup () {
      this.$refs.userPopup.showPopup()
    },
    // 提交账户信息
    async userSubmit () {
      let that = this
      console.log('点击了账户信息确定按钮')
      that.isUser = true
      let data = {
        wechat_account: that.userForm.wechat_account,
        phone: that.userForm.phone
      }
      console.log(that.filterNull(data))
      if (!that.filterNull(data)) {
        return
      }
      let res = await that.$request({ url: that.$api.wxInfo, method: 'post', data: data }, true)
      if (res.code === 0) {
        that.$toast(res.msg)
        that.$refs.userPopup.hidePopup()
        that.getUserInfo()
      }
    },
    // 取消收款信息
    userCancel () {
      console.log('点击了账户信息取消')
      this.isUser = false
      this.setObjDef('userForm')
    },
    // 提现
    applyPopup () {
      console.log('点击了提现按钮')
      let that = this
      if (that.userInfo.balance <= 0) {
        that.$toast('当前暂无可提现金额')
        return
      }
      that.$refs.applyPopup.showPopup()
    },
    async applySubmit () {
      let that = this
      let res = await that.$request({ url: that.$api.withdraw, method: 'post', data: { money: that.userInfo.balance * 1000 / 10 } }, true)
      if (res.code === 0) {
        that.$toast(res.msg)
        that.getUserInfo()
        this.$refs.applyPopup.hidePopup()
      } else {
        this.applyError = res.msg
        this.applyStatus = 2
        this.$refs.applyPopup.showPopup()
      }
    },
    // 过滤空
    filterNull (data) {
      for (let obj in data) {
        console.log('data[obj', data[obj])
        if (data[obj] === '' && !data[obj] && data[obj] == 0) {
          console.log('进来了', data[obj])
          return false
        }
      }
      return true
    },
    // 重新赋予输入框原始值
    setObjDef (name) {
      let data = this[name]
      for (let obj in data) {
        data[obj] = this.userInfo[obj]
      }
      this[name] = data
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
<style>
  .van-pull-refresh {
    overflow: visible!important;
  }
</style>
