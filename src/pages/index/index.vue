<template>
  <div class="index">
    <div class="banner">
      <lunbo :imageList="bannerList" />
    </div>
    <div class="menu-list-wrapper">
      <div class="menu-list">
        <div class="menu" v-for="(menu,index) in iconList" :key="index" @click="linkToCate(menu.jumpUrl,menu.remark,menu.id,menu.isEnabled)">
          <img :src="menu.url" alt="">
          <p>{{menu.name}}</p>
        </div>
      </div>
    </div>
    <div class="early-new">
      <lunbo :imageList="earlyList" />
    </div>
    <div class="article-list">
      <articleItem v-for="(article,index) in articleList" :key="index" :articleData="article" />
    </div>
    <!-- <form @submit="testSubmit" report-submit="true">
      <button formType="submit">发送模板消息</button>
    </form> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { bannerList, iconList } from './mock.js'

import articleItem from '@/components/articleItem'
import lunbo from '@/components/lunbo'

export default {
  data () {
    return {
      userInfo: {},
      // bannerList: bannerList,
      // earlyList: bannerList,
      // iconList: iconList,
      articleList: [],
      bannerList: [],
      earlyList: [],
      iconList: [],
      hasMoreData: true, // 上拉的时候是不是要继续请求数据
      pageNum: 1,
      pageSize: 2

    }
  },
  methods: {
    ...mapActions(['getUserInfo']),
    // banner
    // testSubmit (e) {
    //   const { mp } = e
    //   console.log('mp.detail.formId', mp.detail.formId)

    //   let params = {fromId: mp.detail.formId}
    //   this.$http(this.$apis.testSend, params).then(res => {
    //     console.log(res)
    //   })
    //   console.log('form e', e)
    // },
    getBannerList () {
      // 顶部
      this.$http(this.$apis.getBannerList, {position: 0}).then(res => {
        this.bannerList = res.data || []
        console.log(this.bannerList)
      })
      // 中间
      this.$http(this.$apis.getBannerList, {position: 1}).then(res => {
        this.earlyList = res.data || []
        console.log(this.earlyList)
      })
    },
    // 菜单列表
    async getIconList () {
      let res = await this.$http(this.$apis.getIconList, {})
      this.iconList = res.data || []
    },
    // 文章列表
    getArticleList () {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.$http(this.$apis.getArticleList, params).then(res => {
        const { isLastPage } = res.data
        let articleListTem = this.articleList
        if (res.code === 200) {
          if (this.pageNum === 1) {
            articleListTem = []
          }
          let articleList = res.data.list
          if (isLastPage) { // 如果是最后一页
            this.articleList = articleListTem.concat(articleList)
            this.hasMoreData = false
          } else {
            this.articleList = articleListTem.concat(articleList)
            this.hasMoreData = true
            this.pageNum = this.pageNum + 1
          }
        }
      })
    },
    // 跳转到分类详情
    linkToCate (url, remark, id, isEnabled) {
      if (remark === 'planet') {
        wx.navigateToMiniProgram({
          appId: 'wxac35230c99e1209b',
          path: 'pages/index/index',
          extraData: {},
          envVersion: 'develop',
          success: function () {
          }
        })
      } else {
        if (isEnabled === 0) {
          wx.showToast({
            title: '暂未开放~',
            icon: 'none'
          })
          return false
        }
        wx.navigateTo({
          url: url + '?id=' + id
        })
      }
    }
  },
  onLoad () {
    this.$setNavigationBarTitle('玩物立志')
    // this.getUserInfo()
    this.getBannerList()
    this.getIconList()
    this.getArticleList()
    // console.log('iconList', iconList)
    // console.log('bannerList', bannerList)
    // this.userInfo = wx.getStorageSync('userInfo')
  },
  computed: {
  },
  components: {
    articleItem,
    lunbo
  },
  // 上拉加载
  onReachBottom: function () {
    if (this.hasMoreData) {
      this.getArticleList()
    } else {
      wx.showToast({
        title: '没有更多数据~',
        icon: 'none'
      })
    }
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.getUserInfo()
    this.getBannerList()
    this.getIconList()
    this.pageNum = 1
    this.getArticleList()
  }
}
</script>

<style lang="stylus" scoped>
.index
  .banner
    width 100%
    height 245rpx
    img
      width 100%
      height 100%
  .menu-list-wrapper
    padding 20rpx 10rpx
    background #31B6FF
    .menu-list
      display flex
      flex-wrap wrap
      justify-content space-around
      // margin-top 50rpx
      background #fff
      border-radius: 6rpx;
      .menu
        display flex
        flex-direction column
        align-items center
        padding 24rpx 20rpx
        img
          width 100rpx
          height 100rpx
        p
          font-size 26rpx
  .early-new
    height 250rpx
</style>
