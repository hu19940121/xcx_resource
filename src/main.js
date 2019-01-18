import Vue from 'vue'
import App from './App'
import store from './store/index'
import http from '@/utils/http.js' // 导入封装好的http
import apis from '@/utils/apis.js'
import { setNavigationBarTitle } from '@/utils/index.js'
Vue.prototype.$store = store
Vue.prototype.$http = http
Vue.prototype.$apis = apis
Vue.prototype.$setNavigationBarTitle = setNavigationBarTitle

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
