
const apis = {

  xcxLogin: { // 小程序登录
    url: '/planet/api/weixin/autoXcxLogin',
    method: 'post'
  },
  getUserInfo: { // 获取用户信息
    url: '/planet/api/user/getUserInfo',
    method: 'get'
  },
  selectLineCourseTermInfoById: {
    url: '/planet/api/lineCourseTerm/selectLineCourseTermInfoById', // 根据id获取商品详情
    method: 'get'
  }
}

export default apis
