
const apis = {

  xcxLogin: { // 小程序登录
    url: '/xcxLogin',
    method: 'post'
  },
  getUserInfo: { // 获取用户信息
    url: '/userCenter/getUserInfo',
    method: 'get'
  },
  perfectKid: {// 完善孩子信息
    url: '/userCenter/perfectKid',
    method: 'post'
  },
  getKidInfo: {// 获取孩子信息
    url: '/userCenter/getKidInfo',
    method: 'get'
  },
  getPhoneNumber: {// 根据getPhoneNumber解析获取手机号
    url: '/getPhoneNumber',
    method: 'post'
  },
  getBannerList: {// 获取banner
    url: '/banner/getBannerList',
    method: 'get'
  },
  getIconList: {// 获取icon
    url: '/icon/getIconList',
    method: 'get'
  },
  getArticleList: {// 获取首页文章列表
    url: '/article/getArticleList',
    method: 'get'
  },
  getArticleDetail: {// 获取文章详情
    url: '/article/getArticleDetail',
    method: 'get'
  },
  getVideoById: {// 获取视频资源
    url: '/video/getVideoById',
    method: 'get'
  },
  getQuestionList: {// 获取问题列表
    url: '/question/getQuestionList',
    method: 'get'
  },
  getReplyList: {// 获取评论回复列表
    url: '/reply/getReplyList',
    method: 'get'
  },
  addReply: {// 回复
    url: '/reply/addReply',
    method: 'post'
  },
  getTaskListByResourceIds: {// 获取任务
    url: '/task/getTaskListByResourceIds',
    method: 'get'
  },
  getMyResource: {// 获取已解锁的资源
    url: '/resource/getMyResource',
    method: 'get'
  },
  shareTaskSuccess: { // 分享成功回调
    url: '/task/shareTaskSuccess',
    method: 'get'
  },
  getUserTaskDetail: { // 获取当前用户的任务进度
    url: '/task/getUserTaskDetail',
    method: 'get'
  },
  receiveResource: { // 领取资源
    url: '/resource/receiveResource',
    method: 'get'
  },
  getArticleListByIconId: { // 分类详情以及分类下的文章列表
    url: '/article/getArticleListByIconId',
    method: 'get'
  },
  createQrCode: { // 获取订阅号场景二维码
    url: '/zgh/createQrCode',
    method: 'get'
  },
  getOngoingTask: { // 获取正在进行中的任务
    url: '/task/getOngoingTask',
    method: 'get'
  },
  getResourceDetailById: { // 获取正在进行中的任务
    url: '/resource/getResourceDetailById',
    method: 'get'
  },
  checkIsReceived: { // check是否已经领取过资源
    url: '/resource/checkIsReceived',
    method: 'get'
  },
  testSend: { // 消息推送
    url: '/testSend',
    method: 'get'
  }
}

export default apis
