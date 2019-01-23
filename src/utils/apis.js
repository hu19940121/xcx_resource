
const apis = {

  xcxLogin: { // 小程序登录
    url: '/xcxLogin',
    method: 'post'
  },
  getUserInfo: { // 获取用户信息
    url: '/userCenter/getUserInfo',
    method: 'get'
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
  getPhoneNumber: {// 获取文章详情
    url: '/getPhoneNumber',
    method: 'post'
  }
}

export default apis
