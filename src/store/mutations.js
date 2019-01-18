import * as types from './mutation-types.js'
export default {
  [types.SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
    wx.setStorageSync('userInfo', userInfo)
  },
  [types.SET_TESTT] (state) {
    state.testT = '改变过后的文字'
  }

}
