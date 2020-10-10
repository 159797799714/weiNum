module.exports = {
  wxConfig: '/wx_config', // 微信sdk签名

  // 用户接口
  authUrl: '/user/auth_url', // 微信用户授权链接生成
  getToken: '/user/get_token', // 微信用户登录自动注册并获取token接口
  tiktokList: '/user/tiktok/accounts', // 已绑定抖音账户列表获取
  userInfo: '/user/info', // 用户个人中心收益和个人信息
  payInfo: '/user/pay_info', // 用户支付信息修改
  wxInfo: '/user/wx_info', // 用户微信信息修改
  cashflow: '/user/cashflow', // 用户体现列表

  // 公告
  notices: '/notices', // 公告列表获取
  notice: '/notice/:id', // 公告详情获取

  // 单王
  rankList: '/rank/list', // 单王排行榜

  // 小程序
  indexAppletList: '/h5Applet/indexAppletList', // 首页小程序列表
  appletList: '/h5Applet/appletList', // 小程序查看更多模块列表
  appDetail: '/h5Applet/detail', // 小程序详情
  appletQrcode: '/h5Applet/createQrcode', // 生成小程序推广二维码
  ecpm: '/h5Applet/eCpm', // 小程序详情ecpm查询

  // 订单
  userCount: '/order/user_count', // 自推订单收益信息
  teamCount: '/order/team_count', // 团队订单收益信息
  orders: '/orders', // 订单列表
  appletSearch: '/order/applet_search', // 订单所需小程序列表
  tikUsers: '/order/tik_users', // 订单所需多级抖音用户列表

  // 提现
  cashflows: '/user/cashflow', // 提现列表获取
  withdraw: '/user/withdraw', // 用户申请提现

  // 团队
  teamList: '/user/team_list' // 团队列表

}

// 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd92293402f73f76f&redirect_uri=http://test-doutui.mambike.com&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'