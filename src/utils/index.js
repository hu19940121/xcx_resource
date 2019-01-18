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
export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export function setNavigationBarTitle (title) {
  wx.setNavigationBarTitle({
    title
  })
}

export default {
  formatNumber,
  formatTime,
  urlEncode
}
