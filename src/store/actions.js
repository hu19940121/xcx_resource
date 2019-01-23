import * as types from './mutation-types.js'
import http from '@/utils/http.js'
import apis from '@/utils/apis.js'
import utils from '@/utils/index.js'

export default {
  async getUserInfo ({commit}) {
    const res = await http(apis.getUserInfo, { })
    wx.setStorageSync('userInfo', res.data.userVO)
    commit(types.SET_USERINFO, res.data.userVO)
  },
  async login ({dispatch, commit}, loginParams) {
    const res = await http(apis.xcxLogin, loginParams)
    wx.setStorageSync('sessionKey', res.data.token)
    // eslint-disable-next-line no-undef
    var pages = getCurrentPages() // 获取当前打开的页面
    const prePage = pages[0] // 获取进来的页面
    console.log('prePage', prePage)
    const paramsStr = utils.urlEncode(prePage.options).slice(1) // 构建页面所需参数
    // console.log('参数', paramsStr)
    dispatch('getUserInfo').then(res => {
      setTimeout(() => { // 延迟调用 防止不跳转
        wx.reLaunch({
          url: `/${prePage.route}?${paramsStr}`
        })
      }, 400)
    })
  },
  changeTestT ({dispatch, commit}) {
    commit(types.SET_TESTT)
  }
}
