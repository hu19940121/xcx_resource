<template>
  <div class="resource-detail">
    <div class="detail-wrapper">
      <h1 class="title">
        {{article.title}}
      </h1>
      <p class="xg-info">
        原创：耐撕BaBa
        <span class="author">玩物立志</span>
        <span>{{createTime}}</span>
      </p>
      <div class="content">
        <wxParse :content="article.content" @preview="preview" @navigate="navigate" />
      </div>
    </div>
    <div class="btn-wrapper">
      <!-- <button v-if="userInfo.phone"  class="lq-btn" @click="linkToRecres">领取资源</button> -->
      <block v-if="article.hasResource === 1">
        <button v-if="userInfo.phone" class="lq-btn" @click="linkToRecres">领取资源</button>
        <button v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="lq-btn">领取资源</button>
      </block>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import wxParse from 'mpvue-wxparse'
import { formatTime, showModal } from '../../utils/index.js'
export default {
  data () {
    return {
      userInfo: {},
      article: {
        // title: '未来科技城，教育之伤还是教育之梦？（附未来科技城学区攻略）',
        // article: '<p><span style="color: rgb(64, 64, 64);"><img src="http://test.steam001.com/FuuYbYG3Bit_mt4bcBsqYvjnKFFK">参加2018年暑假的“未来城市”夏令营学员，将有机会优先进入2018年11月未来之城中国赛的“玩物星球代表队”。</span></p><p><br></p><p><span style="color: rgb(64, 64, 64);">【上课地点】</span></p><p><span style="color: rgb(64, 64, 64);">城西中心：杭州市西湖区萍水街80号优盘时代1号楼1704</span></p><p><span style="color: rgb(64, 64, 64);">滨江中心（即将开业，请关注后续通知）</span></p><p><span style="color: rgb(64, 64, 64);">【上课时间】</span></p><p><span style="color: rgb(64, 64, 64);">7月16日~7月20日 城西中心</span></p><p><span style="color: rgb(64, 64, 64);">7月30日~8月3日 滨江中心</span></p><p><br></p><p><span style="color: rgb(64, 64, 64);">【课程费用】</span></p><p><span style="color: rgb(64, 64, 64);">非玩物星球会员：4580元/人</span></p><p><span style="color: rgb(64, 64, 64);">玩物星球会员(8折)：3664元/人</span></p><p><span style="color: rgb(64, 64, 64);">【费用包含】开营前项目计划和社会调研的在线指导课程；材料费、午餐费、服装费；不包含住宿费用</span></p><p><br></p><p><span style="color: rgb(64, 64, 64);">【注意】</span></p><p><span style="color: rgb(64, 64, 64);">如果已付款但特殊情况无法来参加夏令营的，可转入后续冬令营。</span></p><p><span style="color: rgb(64, 64, 64);">【退款须知】</span></p><p><span style="color: rgb(64, 64, 64);">开营前60天以上：可全额退款；</span></p><p><span style="color: rgb(64, 64, 64);">开营前30~59天：退70%；</span></p><p><span style="color: rgb(64, 64, 64);">开营前15~29天：退20%；</span></p><p><span style="color: rgb(64, 64, 64);">开营前15天内不支持退款，但可转入后续冬令营。</span></p>'
      }
    }
  },
  // mounted () {
  //   Object.assign(this.$data, this.$options.data())
  //   // this.$root.$mp.query
  // },
  onLoad () {
    this.userInfo = wx.getStorageSync('userInfo')
    this.getArticleDetail()
  },
  onUnload () {
    console.log('写在')
  },
  methods: {
    ...mapActions(['getUserInfo']),

    linkToRecres () {
      const resource = this.article.resourceVOList[0]
      const params = {
        resourceId: resource.id,
        articleId: this.article.id
      }
      this.$http(this.$apis.checkIsReceived, params).then(res => {
        if (res.data.taskStatus === 1) {
          this.linkToResourceDeatail(resource.type, resource.id, resource.showVideoId)
        } else {
          wx.navigateTo({
            url: `/pages/receiveResource/main?resourceId=${resource.id}&articleId=${this.article.id}`
          })
        }
      })
    },
    preview (src, e) {
      // do something
    },
    linkToResourceDeatail (resourceType, resourceId, showVideoId) {
      return {
        1: () => { wx.navigateTo({url: `/pages/receiveSuccess/main?id=${resourceId}`}) },
        2: () => { wx.navigateTo({url: `/pages/living/main?id=${showVideoId}`}) },
        3: () => { wx.navigateTo({url: `/pages/receiveSuccess/main?id=${resourceId}`}) }
      }[resourceType]()
    },
    navigate (href, e) {
      // do something
    },
    async getArticleDetail () {
      let res = await this.$http(this.$apis.getArticleDetail, {id: this.$root.$mp.query.id})
      this.article = res.data || {}
    },
    getPhoneNumber (e) {
      const { mp } = e
      if (mp.detail.errMsg === 'getPhoneNumber:ok') {
        wx.login({
          success: (res) => {
            // 调用后台接口解密获得手机号
            const params = {
              code: res.code,
              encryptedData: mp.detail.encryptedData,
              iv: mp.detail.iv
            }
            this.$http(this.$apis.getPhoneNumber, params).then(res => {
              this.getUserInfo()
              // this.taskDialogvisible = true
              this.linkToRecres()
            })
          }
        })
      } else {
        showModal('请同意获取您的手机号哦~')
      }
    }
  },
  computed: {
    createTime () {
      return formatTime(this.article.createTime)
    }
  },
  components: {
    wxParse
  }
}
</script>

<style lang="stylus" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.detail-wrapper
  padding 30rpx 20rpx
  .title
    font-size 40rpx
  .xg-info
    padding 20rpx 0
    font-size 28rpx
    color #bdbdbd
    span
      margin-left 20rpx
    .author
      color #687692
  .content
    padding-bottom 70rpx
.btn-wrapper
  position fixed
  bottom 0rpx
  width 100%
  padding-bottom 20rpx
  background #fff
  .lq-btn
    width 90%
    margin 0 auto
    background #31B6FF 
    box-shadow: 0 10rpx 0 0 #00A5DF;
    color #fff
    
</style>