// import wx from 'wx' // 引用微信小程序wx对象
// const domain = 'https://www.steamglobe.com' // 正式
// const domain = 'http://dev.steamglobe.com' // 测试
const prefix = '/planet/xcx'
const domain = 'http://192.168.0.111:8082' + prefix// 测试

const http = function (opt, data) { // opt包括请求的url h和 请求方式 get post put delete
  let sessionKey = wx.getStorageSync('sessionKey')// 本地取存储的sessionID
  let header = {}
  if (sessionKey) {
    header = { 'token': sessionKey }
    if (opt.type && opt.type === 'form') { // form表单形式传参
      header = { 'token': sessionKey, 'content-type': 'application/x-www-form-urlencoded' }
    }
  }
  wx.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: domain + opt.url,
      data: data,
      method: opt.method,
      header: header, // 设置请求的 header
      success: function (res) {
        wx.hideLoading()
        if (res.data.code === 500) { // code为500 系统异常
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (res.data.code === 1) { // code为1 错误信息
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (res.data.code === 2) { // code为2 则未登录
          wx.clearStorage()
          wx.navigateTo({
            url: '/pages/noAuthUserPage/main'
          })
          return
        }
        resolve(res.data) // 返回正确的数据
      },
      fail: function (error) {
        wx.hideLoading()
        reject(error)// 请求失败
        // fail
      },
      complete: function () {
        wx.hideLoading()
        // complete
      }
    })
  })
}
export default http
