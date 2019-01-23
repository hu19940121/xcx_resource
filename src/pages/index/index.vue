<template>
  <div class="index">
    <div class="banner">
      <lunbo :imageList="bannerList" />
    </div>
    <div class="menu-list-wrapper">
      <div class="menu-list">
        <div class="menu" v-for="(menu,index) in iconList" :key="index" @click="linkToCate(menu.jumpUrl)">
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
      iconList: []
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),
    // banner
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
    async getArticleList () {
      let res = await this.$http(this.$apis.getArticleList, {})
      this.articleList = res.data || []
      console.log('this.articleList', this.articleList)
    },
    // 跳转到分类详情
    linkToCate (url) {
      wx.navigateTo({
        url: url
      })
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
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.getUserInfo()
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
