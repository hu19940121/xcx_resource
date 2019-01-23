function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
// 把对象转换为url参数 eg {name:'xxx',age:13} 转换为 name=xxx&age=13
function urlEncode (param, key, encode) {
  console.log('进入')
  if (param == null) return ''
  var paramStr = ''
  var t = typeof (param)
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}
/**
 * @method
 * @param {Int} time 时间戳
 * @param {Boolean} year 是否显示年份
 * @returns {String} 运营商名称
 * @desc 根据时间戳转换为日期格式
 */
export function formatTime (time, year = true) {
  if (!time) return ''
  var date = new Date(time)
  var M = date.getMonth() + 1
  var y = date.getFullYear()
  var d = date.getDate()

  if (M < 10) M = '0' + M
  if (d < 10) d = '0' + d
  if (year) {
    return y + '年' + M + '月' + d + '日'
  } else {
    return M + '月' + d + '日'
  }
}

export function setNavigationBarTitle (title) {
  wx.setNavigationBarTitle({
    title
  })
}
export function showModal (content = '') {
  wx.showModal({
    title: '提示',
    content: content
  })
}
// export function linkToSomeWhere

export default {
  formatNumber,
  formatTime,
  urlEncode
}
